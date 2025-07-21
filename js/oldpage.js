window.addEventListener("load", () => {
  console.log("ページロード完了");
  const navEntries = performance.getEntriesByType("navigation");
  let navType = navEntries.length > 0 ? navEntries[0].type : null;

  if (!navType && performance.navigation) {
    switch (performance.navigation.type) {
      case 0: navType = 'navigate'; break;
      case 1: navType = 'reload'; break;
      case 2: navType = 'back_forward'; break;
    }
  }
  console.log("navigation type:", navType);

  if (navType === "back_forward") {
    const container = document.getElementById("novel-container");
    if (!container) {
      console.log("novel-containerが見つかりません");
      return;
    }
    container.style.transformOrigin = "right center";
    container.style.transform = "rotateY(90deg)";
    container.style.opacity = "0.3";
    document.body.style.perspective = "1500px";
    container.style.animation = "flipOpenRightToLeft 0.8s forwards ease-out";
    console.log("アニメーション発動");
  } else {
    console.log("戻る操作ではありません");
  }
});
