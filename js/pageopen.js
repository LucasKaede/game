// ページが開いた時に「めくられる」ような演出を追加
window.addEventListener("load", () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pageFlipIn {
      0% {
        transform: rotateY(90deg);
        opacity: 0;
      }
      100% {
        transform: rotateY(0deg);
        opacity: 1;
      }
    }
    body {
      transform-origin: left center;
      animation: pageFlipIn 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
});
