const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');

// \n を「実際の改行」として処理するには、バックスラッシュは「\\n」ではなく、実際に改行する
const novelText = `闇の中から何かが這い出してくる。
その気配に気づいた時、すでに遅かった。
次の瞬間︱︱`;

let charIndex = 0;

function typeWriter() {
  if (charIndex < novelText.length) {
    const currentTwo = novelText.slice(charIndex, charIndex + 2);

    if (currentTwo === '︱︱') {
      const span = document.createElement('span');
      span.className = 'tight';
      span.textContent = '︱︱';
      textArea.appendChild(span);
      charIndex += 2;
    } else {
      const char = novelText[charIndex];

      if (char === '\n') {
        textArea.appendChild(document.createElement('br'));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        textArea.appendChild(span);
      }

      charIndex++;
    }

    setTimeout(typeWriter, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('background').style.backgroundImage = "url('background.jpg')";
  typeWriter();
});

nextPageButton.addEventListener('click', () => {
  if (inputBox.value.trim() !== '') {
    window.location.href = 'next.html';
  }
});
