window.addEventListener("load", () => {
  const style = document.createElement("style");
  style.textContent = `
    body {
      perspective: 1000px; /* 奥行きを出す */
      overflow-x: hidden; /* 横スクロール防止 */
    }
    @keyframes pageFlipIn {
      0% {
        transform-origin: left center;
        transform: rotateY(90deg);
        opacity: 0;
        box-shadow: none;
      }
      50% {
        opacity: 1;
        box-shadow: -10px 0 30px rgba(0,0,0,0.3);
      }
      100% {
        transform-origin: left center;
        transform: rotateY(0deg);
        opacity: 1;
        box-shadow: none;
      }
    }
    body {
      animation: pageFlipIn 0.8s ease-out forwards;
      transform-origin: left center;
      background: white;
    }
  `;
  document.head.appendChild(style);
});
