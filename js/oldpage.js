// アニメーション用スタイルを動的に追加
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenRightToLeft {
  from {
    transform: rotateY(-90deg);
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
  }
}
@keyframes flipCloseLeftToRight {
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
  }
}
`;
document.head.appendChild(style);

// ページ読み込み時に戻ってきた場合の開くアニメーション
window.addEventListener("load", () => {
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  if (navType === "back_forward") {
    const container = document.getElementById("novel-container");
    container.style.transformOrigin = "left center";
    container.style.transform = "rotateY(-90deg)";
    container.style.opacity = "0.3";
    document.body.style.perspective = "1500px";
    container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
  }
});

// 次ページへ行くときの閉じるアニメーション（左から右）
document.getElementById("next-page").addEventListener("click", () => {
  const container = document.getElementById("novel-container");
  container.style.border = "1px solid white";
  if (!document.body.style.perspective) {
    document.body.style.perspective = "1500px";
  }
  container.style.transformOrigin = "right center";
  container.style.animation = "flipCloseLeftToRight 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    console.log("左から右にページをめくるアニメーション終了");
    // ※ここでページ遷移など行うなら、typewriterや入力部分のJSに組み込んでください
  }, { once: true });
});
