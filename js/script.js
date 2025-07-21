const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');
const backPageButton = document.getElementById('back-page');
const background = document.getElementById('background');

let novelText = null;
let charIndex = 0;

// --- フリップアニメーション用スタイルを動的に追加 ---
const style = document.createElement("style");
style.textContent = `
@keyframes flipCloseRightToLeft {
  from {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
}
@keyframes flipOpenRightToLeftReverse {
  from {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
}
`;
document.head.appendChild(style);

// --- 開くアニメーション（ページ表示時に実行） ---
function runFlipOpenAnimation() {
  const container = document.getElementById("novel-container");
  if (!container) return;

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(90deg)";
  container.style.opacity = "0.3";
  container.style.position = "relative";
  container.style.zIndex = "10";

  document.body.style.perspective = "1500px";
  container.style.animation = "flipOpenRightToLeftReverse 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    container.style.zIndex = "1";
  }, { once: true });
}

// --- 閉じるアニメーション＋遷移（遷移先URLを受け取る） ---
function navigateWithCloseFlip(url) {
  const container = document.getElementById("novel-container");
  if (!container) {
    window.location.href = url; // コンテナなければ即遷移
    return;
  }

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(0deg)";
  container.style.opacity = "1";
  container.style.position = "relative";
  container.style.zIndex = "1";

  document.body.style.perspective = "1500px";
  container.style.animation = "flipCloseRightToLeft 0.8s forwards ease-in";

  container.addEventListener("animationend", () => {
    window.location.href = url;
  }, { once: true });
}

// --- JSONからテキスト・背景を読み込み ---
fetch("/game/js/noveltext.json")
  .then(response => response.json())
  .then(data => {
    const path = window.location.href;
    const entry = data[path];

    if (entry) {
      novelText = entry.text;
      background.style.backgroundImage = `url('${entry.background}')`;
    } else {
      novelText = "……（このページにはまだ物語がありません）";
      background.style.backgroundImage = "none";
    }

    waitForAnimationAndStartText();
  })
  .catch(err => {
    console.error("テキストの読み込みに失敗しました", err);
    novelText = "（テキスト読み込み失敗）";
    waitForAnimationAndStartText();
  });

// --- タイプライター起動待機 ---
function waitForAnimationAndStartText() {
  const container = document.getElementById("novel-container");
  if (!container) {
    if (novelText) typeWriter();
    return;
  }

  // ページ開く時のアニメーション完了を待つ
  container.addEventListener("animationend", () => {
    if (novelText) typeWriter();
  }, { once: true });

  // もしアニメーションが既に終わってたら即起動
  if (!container.style.animationName) {
    if (novelText) typeWriter();
  }
}

// --- タイプライター関数 ---
function typeWriter() {
  if (!novelText) return;

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

// --- イベント登録：次ページボタン ---
if (nextPageButton) {
  nextPageButton.addEventListener('click', () => {
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
          navigateWithCloseFlip(route.url);  // アニメ実行後に遷移
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    if (!matched) {
      navigateWithCloseFlip('not-found.html');
    }
  });
}

// --- イベント登録：戻るボタン ---
if (backPageButton) {
  backPageButton.addEventListener('click', () => {
    navigateWithCloseFlip('https://lucaskaede.github.io/game/retry.html');
  });
}

// --- ページロード時に開くアニメーション＋タイプライター起動 ---
window.addEventListener("pageshow", () => {
  runFlipOpenAnimation();
});
