// keyframesをJSで動的に追加（立体感アップ＆枠線細く）
const style = document.createElement("style");
style.textContent = `
@keyframes flipClose {
  to {
    transform: rotateY(-120deg);
    opacity: 0.3;
    box-shadow: -15px 0 40px rgba(0,0,0,0.5);
  }
}
`;
document.head.appendChild(style);

document.getElementById("next-page").addEventListener("click", () => {
  const container = document.getElementById("novel-container");
  
  // 枠線を細く1pxに設定（もしCSSに枠線なければ）
  container.style.border = "1px solid white";

  // 立体感を出すためbodyにperspective追加（無ければ）
  if (!document.body.style.perspective) {
    document.body.style.perspective = "1500px";
  }

  // transform-originを左中心に設定
  container.style.transformOrigin = "left center";

  // アニメーションを付与
  container.style.animation = "flipClose 0.8s forwards ease-out";

  // アニメーション終了時の処理
  container.addEventListener("animationend", () => {
    console.log("アニメーション終了！ここで次のページへ遷移");
    // 例: location.href = "次のページURL";
  }, { once: true });
});
