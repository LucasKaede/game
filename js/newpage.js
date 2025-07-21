// keyframesをJSで動的に追加（右から左にめくる開くアニメーション）
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeft {
  from {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
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

  document.body.style.perspective = "1500px";
  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(90deg)";
  container.style.opacity = "0.3";

  container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
});
