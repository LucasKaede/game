const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');

const novelText = `const novelText = `闇の中から何かが這い出してくる。\nその気配に気づいた時、すでに遅かった。\n次の瞬間︱`;

let charIndex = 0;

function typeWriter() {
  if (charIndex < novelText.length) {
    textArea.textContent += novelText[charIndex];
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('background').style.backgroundImage = "url('background.jpg')";
  typeWriter();
});

nextPageButton.addEventListener('click', () => {
  if (inputBox.value.trim() !== '') {
    window.location.href = 'next.html'; // 遷移先ページを指定
  }
});
