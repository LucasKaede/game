// フリップアニメーション用スタイルを動的に追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipCoverFromLeft {
  from {
    transform: rotateY(-90deg);
    opacity: 0.3;
    box-shadow: 30px 0 60px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 10;
  }
}
`;
document.head.appendChild(style);

// アニメーション実行関数
function runFlipCoverAnimation() {
  const container = document.getElementById("novel-container");
  if (!container) return;

  // 重なり感を出すために上に配置
  container.style.position = "absolute";
  container.style.top = "0";
  container.style.left = "0";
  container.style.right = "0";
  container.style.bottom = "0";
  container.style.zIndex = "10";

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(-90deg)";
  container.style.opacity = "0.3";
  document.body.style.perspective = "1500px";

  container.style.animation = "flipCoverFromLeft 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    container.style.zIndex = "1";
    container.style.position = "relative"; // 戻す
  }, { once: true });
}

// ページ表示イベント
window.addEventListener("pageshow", () => {
  runFlipCoverAnimation();

  // 遅延でタイプライター起動（typeWriterは別スクリプトにある前提）
  if (typeof typeWriter === "function") {
    setTimeout(() => typeWriter(), 850);
  }
});
