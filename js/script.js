const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');
const background = document.getElementById('background');

let novelText = "（読み込み中…）";
let charIndex = 0;

// JSONから現在のURLに対応するテキストと背景画像を読み込む
fetch("/game/js/noveltext.json")
  .then(response => response.json())
  .then(data => {
    const path = window.location.href;
    const entry = data[path];

    if (entry) {
      novelText = entry.text;
      background.style.backgroundImage = `url('${entry.background}')`;
    } else {
      novelText = "……（このページにはまだ物語がありません）";
      background.style.backgroundImage = "none";
    }

    typeWriter();
  })
  .catch(err => {
    console.error("テキストの読み込みに失敗しました", err);
    novelText = "（テキスト読み込み失敗）";
    typeWriter();
  });

// タイプライター風の文字表示関数
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

// 入力に応じてページ遷移
nextPageButton.addEventListener('click', () => {
  const input = inputBox.value.trim();
  if (input === '') return;

  const routes = [
    { keywords: ['包丁','ほうちょう', 'ナイフ'], url: '/game/udr/knife.html' },
    { keywords: ['走る', '逃げる'], url: '/game/udr/escape.html' },
    { keywords: ['叫ぶ'], url: '/game/udr/scream.html' }
  ];

  let matched = false;

  for (const route of routes) {
    for (const keyword of route.keywords) {
      if (input.includes(keyword)) {
        window.location.href = route.url;
        matched = true;
        break;
      }
    }
    if (matched) break;
  }

  if (!matched) {
    window.location.href = 'not-found.html';
  }
});
