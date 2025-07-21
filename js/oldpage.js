// アニメーション用スタイルを動的に追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeft {
  from {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
  }
}
`;
document.head.appendChild(style);

// ページ読み込み時に「戻る」で来た場合のみアニメーション発火
window.addEventListener("load", () => {
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  if (navType === "back_forward") {
    const container = document.getElementById("novel-container");
    container.style.transformOrigin = "right center";  // ←ここを left から right に修正
    container.style.transform = "rotateY(90deg)";
    container.style.opacity = "0.3";
    document.body.style.perspective = "1500px";
    container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
  }
});
