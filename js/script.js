// アニメーション用CSS（開く／閉じる）を動的追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeft {
  from {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
}
@keyframes flipCloseRightToLeft {
  from {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
}
#novel-container {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
`;
document.head.appendChild(style);

// 開くアニメーション
function runFlipAnimationOpen(callback) {
  const container = document.getElementById("novel-container");
  if (!container) {
    if (typeof callback === "function") callback();
    return;
  }

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(0deg)";
  container.style.opacity = "1";
  container.style.position = "relative";
  container.style.zIndex = "1";
  document.body.style.perspective = "1500px";
  container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    if (typeof callback === "function") callback();
  }, { once: true });
}

// 閉じるアニメーション
function runFlipAnimationClose(callback) {
  const container = document.getElementById("novel-container");
  if (!container) {
    if (typeof callback === "function") callback();
    return;
  }

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(90deg)";
  container.style.opacity = "0.3";
  container.style.position = "relative";
  container.style.zIndex = "10";
  document.body.style.perspective = "1500px";
  container.style.animation = "flipCloseRightToLeft 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    container.style.zIndex = "1";
    if (typeof callback === "function") callback();
  }, { once: true });
}

// DOM取得
const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const background = document.getElementById('background');
const button = document.querySelector('button[data-action]');
const action = button?.dataset?.action;

let novelText = null;
let charIndex = 0;

// JSON読み込み＆表示制御
fetch("/game/js/noveltext.json")
  .then(response => response.json())
  .then(data => {
    const path = window.location.href;
    const entry = data[path];

    if (entry) {
      novelText = entry.text;
      if (background) background.style.backgroundImage = `url('${entry.background}')`;
    } else {
      novelText = "……（このページにはまだ物語がありません）";
      if (background) background.style.backgroundImage = "none";
    }

    startAnimation();
  })
  .catch(err => {
    console.error("テキストの読み込みに失敗しました", err);
    novelText = "（テキスト読み込み失敗）";
    startAnimation();
  });

// アニメーション実行分岐
function startAnimation() {
  if (window.location.pathname === "/game/retry.html") {
    runFlipAnimationClose(() => {
      if (novelText) typeWriter();
    });
  } else {
    if (novelText) typeWriter();
  }
}

// タイプライター関数
function typeWriter() {
  if (!novelText || !textArea) return;

  if (charIndex < novelText.length) {
    const currentTwo = novelText.slice(charIndex, charIndex + 2);

    if (currentTwo === '︱︱') {
      const span = document.createElement('span');
      span.className = 'tight';
      span.textContent = '︱︱';
      textArea.appendChild(span);
      charIndex += 2;
    } else {
      const char = novelText[charIndex];

      if (char === '\n') {
        textArea.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        textArea.appendChild(span);
      }

      charIndex++;
    }

    setTimeout(typeWriter, 100);
  }
}

// ページ遷移（次のページへ）※アニメーションあり
function handleNextPageTransition() {
  if (!inputBox) return;
  const input = inputBox.value.trim();
  if (input === '') return;

  const routes = [
    { keywords: ['包丁','ほうちょう', 'ナイフ'], url: '/game/udr/knife.html' },
    { keywords: ['走る', '逃げる'], url: '/game/udr/escape.html' },
    { keywords: ['叫ぶ'], url: '/game/udr/scream.html' }
  ];

  let matched = false;

  for (const route of routes) {
    for (const keyword of route.keywords) {
      if (input.includes(keyword)) {
        runFlipAnimationOpen(() => {
          window.location.href = route.url;
        });
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  if (!matched) {
    runFlipAnimationOpen(() => {
      window.location.href = 'not-found.html';
    });
  }
}

// 🔽 アニメーションなしで単純遷移する処理
function handlePlainTransition() {
  if (!inputBox) return;
  const input = inputBox.value.trim();
  if (input === '') return;

  // 例として "スキップ" などに対応
  const plainRoutes = [
    { keywords: ['スキップ', '次'], url: '/game/udr/skip.html' }
  ];

  for (const route of plainRoutes) {
    for (const keyword of route.keywords) {
      if (input.includes(keyword)) {
        window.location.href = route.url; // アニメーションなし
        return;
      }
    }
  }

  // 該当しなければnot-foundへ（こちらもアニメなし）
  window.location.href = 'not-found.html';
}

// ボタン押下イベント
if (action === "open") {
  button.addEventListener("click", e => {
    e.preventDefault();
    handleNextPageTransition(); // アニメーションあり
  });
} else if (action === "plain") {
  button.addEventListener("click", e => {
    e.preventDefault();
    handlePlainTransition(); // アニメーションなし
  });
}
