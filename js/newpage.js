// フリップアニメーション用スタイルを動的に追加
const flipStyle = document.createElement("style");
flipStyle.textContent = `
@keyframes flipPageOut {
  from {
    transform: rotateY(-90deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;
  }
  to {
    transform: rotateY(0deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
    z-index: 10;
  }
}`;
document.head.appendChild(flipStyle);

// ページフリップ後に遷移する関数
function animatePageTransitionAndNavigate(targetUrl) {
  const container = document.getElementById("novel-container");
  if (!container) {
    window.location.href = targetUrl;
    return;
  }

  container.style.transformOrigin = "right center";
  container.style.position = "relative";
  container.style.zIndex = "1";
  document.body.style.perspective = "1500px";

  // アニメ開始
  container.style.animation = "flipPageOut 0.8s forwards ease-in";

  // アニメ完了後に遷移
  container.addEventListener("animationend", () => {
    window.location.href = targetUrl;
  }, { once: true });
}

// next-page ボタン用に、遷移関数を差し替え
const nextPageButton = document.getElementById('next-page');
const inputBox = document.getElementById('input-box');

if (nextPageButton && inputBox) {
  nextPageButton.addEventListener('click', (e) => {
    const input = inputBox.value.trim();
    if (input === '') return;

    const routes = [
      { keywords: ['包丁','ほうちょう', 'ナイフ'], url: '/game/udr/knife.html' },
      { keywords: ['走る', '逃げる'], url: '/game/udr/escape.html' },
      { keywords: ['叫ぶ'], url: '/game/udr/scream.html' }
    ];

    let matchedUrl = null;

    for (const route of routes) {
      for (const keyword of route.keywords) {
        if (input.includes(keyword)) {
          matchedUrl = route.url;
          break;
        }
      }
      if (matchedUrl) break;
    }

    if (!matchedUrl) {
      matchedUrl = 'not-found.html';
    }

    // デフォルトの即時遷移を防止（競合回避）
    e.preventDefault();

    // 遷移用アニメーション実行
    animatePageTransitionAndNavigate(matchedUrl);
  });
}
