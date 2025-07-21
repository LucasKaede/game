// ▼ すでにある閉じるアニメーション（左から右）
const style = document.createElement("style");
style.textContent = `
@keyframes flipCloseLeftToRight {
  to {
    transform: rotateY(90deg);
    opacity: 0.3;
    box-shadow: 15px 0 40px rgba(0,0,0,0.5);
  }
}
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
`;
document.head.appendChild(style);

// ▼ 戻る操作（popstate）に反応するアニメーション追加
window.addEventListener("popstate", () => {
  const container = document.getElementById("novel-container");
  container.style.transformOrigin = "left center"; // 左端を軸に
  container.style.transform = "rotateY(-90deg)";   // 初期角度
  container.style.opacity = "0.3";
  container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
});

// ▼ 次ページボタンクリック時のアニメーション（左→右）
document.getElementById("next-page").addEventListener("click", () => {
  const container = document.getElementById("novel-container");

  // 枠線・perspective 初期化
  container.style.border = "1px solid white";
  if (!document.body.style.perspective) {
    document.body.style.perspective = "1500px";
  }

  container.style.transformOrigin = "right center";
  container.style.animation = "flipCloseLeftToRight 0.8s forwards ease-out";

  container.addEventListener("animationend", () => {
    console.log("左から右にページをめくるアニメーション終了");

    // 例：次ページへ遷移（履歴を積む）
    // history.pushState(null, '', '/game/udr/knife.html');
    // location.href = '/game/udr/knife.html';
    // ※これがない場合、下の入力ボックスJSが実行してる遷移でOK
  }, { once: true });
});
