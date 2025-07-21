// フリップアニメーション用スタイルを動的に追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeftReverse {
  from {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5); /* 右側に影 */
    z-index: 10; /* アニメ中は手前に */
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
    z-index: 1;  /* 最終的には通常の重なり順に戻す */
  }
}
`;
document.head.appendChild(style);

// アニメーション実行用関数（外出しで再利用可能）
function runFlipAnimationReverse() {
  const container = document.getElementById("novel-container");
  if (!container) return;

  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(90deg)";
  container.style.opacity = "0.3";
  container.style.position = "relative"; // z-indexを効かせるためposition指定
  container.style.zIndex = "10";

  document.body.style.perspective = "1500px";
  container.style.animation = "flipOpenRightToLeftReverse 0.8s forwards ease-out";

  // アニメ終了後にz-indexを戻す
  container.addEventListener("animationend", () => {
    container.style.zIndex = "1";
  }, { once: true });
}

// ページ表示イベント
window.addEventListener("pageshow", () => {
  runFlipAnimationReverse();

  // 遅延でタイプライター起動（typeWriterはscript.js側で定義されている前提）
  if (typeof typeWriter === "function") {
    setTimeout(() => typeWriter(), 850);
  }
});
