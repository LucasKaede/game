// keyframesをJSで動的に追加（左から右にめくる開くアニメーション）
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenLeftToRight {
  from {
    transform: rotateY(90deg);
    opacity: 0.2;
    box-shadow: -30px 0 60px rgba(0,0,0,0.5); /* よりリアルな影 */
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
  }
}
`;
document.head.appendChild(style);

window.addEventListener("load", () => {
  const container = document.getElementById("novel-container");
  if (!container) return;

  // ページに奥行きを与える
  document.body.style.perspective = "1200px";
  document.body.style.overflowX = "hidden"; // 横はみ出し防止

  container.style.transformOrigin = "right center";      // 右端を軸に
  container.style.transform = "rotateY(90deg)";          // 初期状態は右に立っている
  container.style.opacity = "0.2";
  container.style.position = "relative";                 // z-index効かせるため
  container.style.zIndex = "10";

  container.style.animation = "flipOpenLeftToRight 0.8s forwards ease-out";

  // アニメ終了後に z-index 戻す
  container.addEventListener("animationend", () => {
    container.style.zIndex = "1";
  }, { once: true });
});
