// アニメーション用CSS（開く／閉じる）を動的追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeft {
  from {
    transform: rotateY(0deg);    /* 正面（開いてる） */
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
  to {
    transform: rotateY(90deg);   /* 横面（閉じた） */
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
}

@keyframes flipCloseRightToLeft {
  from {
    transform: rotateY(90deg);   /* 横面（閉じた） */
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
  to {
    transform: rotateY(0deg);    /* 正面（開いた） */
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
}`;
document.head.appendChild(style);

// ページを開くアニメーション（正面→横面）
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

// ページを閉じるアニメーション（横面→正面）
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
const nextPageButton = document.getElementById('next-page');
const backPageButton = document.getElementById('back-page');
const background = document.getElementById('background');

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

    waitForAnimationAndStartText();
  })
  .catch(err => {
    console.error("テキストの読み込みに失敗しました", err);
    novelText = "（テキスト読み込み失敗）";
    waitForAnimationAndStartText();
  });

// 表示開始前に閉じるアニメーション
function waitForAnimationAndStartText() {
  runFlipAnimationClose(() => {
    if (novelText) typeWriter();
  });
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

// 次のページ遷移処理（開くアニメーション付き）
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

// 「次のページ」ボタンイベント登録
if (nextPageButton) {
  nextPageButton.addEventListener('click', e => {
    e.preventDefault();
    handleNextPageTransition();
  });
}

// 「戻る」ボタン（任意：開く動作と逆の演出も付けたければ別途runFlipAnimationReverseを実装）
if (backPageButton) {
  backPageButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'https://lucaskaede.github.io/game/retry.html';
  });
}
