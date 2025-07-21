// フリップアニメーション用スタイルを動的に追加
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
}`;
document.head.appendChild(style);

// アニメーション実行用関数（外出しで再利用可能）
function runFlipAnimation() {
  const container = document.getElementById("novel-container");
  if (!container) return;
  container.style.transformOrigin = "right center";
  container.style.transform = "rotateY(90deg)";
  container.style.opacity = "0.3";
  document.body.style.perspective = "1500px";
  container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
}

// ページ表示イベント
window.addEventListener("pageshow", () => {
  console.log("pageshow fired");

  const isBack = sessionStorage.getItem("cameFromBack") === "true";
  console.log("戻り操作判定:", isBack);

  if (isBack) {
    runFlipAnimation();

    // 遅延でtypeWriter起動（定義済みかつJSON取得後に起動されるよう script.js 側でも工夫）
    window.startTyping = () => {
      if (typeof typeWriter === "function") {
        setTimeout(() => typeWriter(), 850);
      }
    };
  } else {
    window.startTyping = () => {
      if (typeof typeWriter === "function") {
        typeWriter();
      }
    };
  }

  // 次回は false 扱い
  sessionStorage.setItem("cameFromBack", "false");
});

// ページ遷移時（このページからどこかに行くとき）
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("cameFromBack", "true");
});
