const current = document.getElementById("page-current");
const next = document.getElementById("page-next");
const btn = document.getElementById("next-page");

// keyframes追加
const style = document.createElement("style");
style.textContent = `
@keyframes closePage {
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
  }
}
@keyframes openPage {
  to {
    transform: rotateY(0deg);
    opacity: 1;
    box-shadow: none;
  }
}
`;
document.head.appendChild(style);

btn.addEventListener("click", () => {
  // 元ページをめくって閉じる
  current.style.animation = "closePage 0.8s forwards ease-out";
  current.style.zIndex = "1";

  // 次ページをめくって開く（少し遅れて開始）
  next.style.animation = "openPage 0.8s forwards ease-out 0.8s";
  next.style.zIndex = "2";

  // アニメーション完了後に何かしたい場合はここに
  next.addEventListener("animationend", () => {
    console.log("ページ切り替えアニメーション完了！");
    // 例: location.href = "次のページURL";
  }, { once: true });
});
