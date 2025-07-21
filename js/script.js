const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');

// 表示する小説テキスト（縦棒が連続する場合を考慮）
const novelText = `闇の中から何かが這い出してくる。
その気配に気づいた時、すでに遅かった。
次の瞬間︱︱`;

// タイピング用のインデックス
let charIndex = 0;

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

// ページ読み込み後に背景画像設定＆文字アニメーション開始
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('background').style.backgroundImage = "url('background.jpg')";
  typeWriter();
});

// 入力に応じてページ遷移
nextPageButton.addEventListener('click', () => {
  const input = inputBox.value.trim();
  if (input === '') return;

  // キーワードセットと遷移先の対応
  const routes = [
    { keywords: ['包丁','ほうちょう', 'ナイフ'], url: '/udr/knife.html' },
    { keywords: ['走る', '逃げる'], url: '/udr/escape.html' },
    { keywords: ['叫ぶ'], url: '/udr/scream.html' }
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
    window.location.href = 'not-found.html'; // どれにも当てはまらない場合
  }
});
