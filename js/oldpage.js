// keyframesをJSで動的に追加（左から右へめくる）
const style = document.createElement("style");
style.textContent = `
@keyframes flipOpenLeftToRight {
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

// 最初に回転済みの状態（右端を軸に90度回転、半透明）
container.style.transformOrigin = "right center";
container.style.transform = "rotateY(90deg)";
container.style.opacity = "0.3";

document.getElementById("next-page").addEventListener("click", () => {
  container.style.animation = "flipCloseLeftToRight 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    console.log("ページを左から右にめくるアニメーション終了");
    // ここで次のページ遷移などの処理を書く
  }, { once: true });
});

// ページ読み込み時に開く動きも入れたいなら以下も実行
window.addEventListener("load", () => {
  container.style.animation = "flipOpenLeftToRight 0.8s forwards ease-out";
});
