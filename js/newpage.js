// keyframesをJSで動的に追加（左から右にめくる閉じるアニメーション）
const style = document.createElement("style");
style.textContent = `
@keyframes flipCloseLeftToRight {
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
  }
}
`;
document.head.appendChild(style);

document.getElementById("next-page").addEventListener("click", () => {
  const container = document.getElementById("novel-container");

  // 枠線を1pxの白線に（必要なら）
  container.style.border = "1px solid white";

  // 立体感用のperspectiveをbodyに設定（未設定なら）
  if (!document.body.style.perspective) {
    document.body.style.perspective = "1500px";
  }

  // 右端を軸にして左から右にめくる動きにする
  container.style.transformOrigin = "right center";

  // アニメーション付与
  container.style.animation = "flipCloseLeftToRight 0.8s forwards ease-out";

  // アニメーション終了時に次の処理
  container.addEventListener("animationend", () => {
    console.log("左から右にページをめくるアニメーション終了");
    // ここでページ遷移などの処理を実装
  }, { once: true });
});
