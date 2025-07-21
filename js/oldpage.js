document.getElementById("next-page").addEventListener("click", () => {
  const container = document.getElementById("novel-container");
  
  // アニメーション用スタイルを追加
  container.style.transformOrigin = "left center";
  container.style.animation = "flipClose 0.8s forwards ease-out";

  // アニメーション終了後の処理
  container.addEventListener("animationend", () => {
    // ここで次のページへ遷移する処理に置き換えてください
    console.log("アニメーション終了！ここで次のページへ遷移");
  }, { once: true });
});

// keyframesをJSで動的に追加（CSSに無ければ）
const style = document.createElement("style");
style.textContent = `
@keyframes flipClose {
  to {
    transform: rotateY(-90deg);
    opacity: 0.5;
  }
}
`;
document.head.appendChild(style);

