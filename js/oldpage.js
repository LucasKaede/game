window.addEventListener("pageshow", () => {
  console.log("pageshow event fired");

  const navType = performance.getEntriesByType("navigation")[0]?.type;
  console.log("navigation type:", navType);

  if (navType === "back_forward") {
    console.log("アニメーション発動");

    const container = document.getElementById("novel-container");
    container.style.transformOrigin = "right center";
    container.style.transform = "rotateY(90deg)";
    container.style.opacity = "0.3";
    document.body.style.perspective = "1500px";
    container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";

    // タイプライターを少し遅らせて起動（アニメが完了する0.8秒後）
    setTimeout(() => {
      if (typeof typeWriter === "function") {
        typeWriter();
      }
    }, 850); // 少し余裕をもたせる
  } else {
    console.log("戻る操作ではありません");

    // 通常は即表示
    if (typeof typeWriter === "function") {
      typeWriter();
    }
  }
});
