// keyframesをJSで動的に追加（左から右にめくって開く／閉じる）
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenLeftToRight {
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

const container = document.getElementById("novel-container");

// ★ 左端を軸に、-90度からスタート（左から右に開く動き）
container.style.transformOrigin = "left center";
container.style.transform = "rotateY(-90deg)";
container.style.opacity = "0.3";

// ページ読み込み時に開くアニメーションを開始
window.addEventListener("load", () => {
  container.style.animation = "flipOpenLeftToRight 0.8s forwards ease-out";
});

// ボタン押下で閉じる（右方向に捲る）
document.getElementById("next-page").addEventListener("click", () => {
  container.style.transformOrigin = "right center"; // ★右端を軸に回転して閉じる
  container.style.animation = "flipCloseLeftToRight 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    console.log("ページを左から右にめくって閉じるアニメーション終了");
    // ここで次ページへ遷移など
  }, { once: true });
});
