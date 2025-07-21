const textArea = document.getElementById('text-area');
const inputBox = document.getElementById('input-box');
const nextPageButton = document.getElementById('next-page');
const background = document.getElementById('background');

let novelText = null;
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

    waitForAnimationAndStartText(); // アニメ後にtypeWriter呼ぶ
  })
  .catch(err => {
    console.error("テキストの読み込みに失敗しました", err);
    novelText = "（テキスト読み込み失敗）";
    waitForAnimationAndStartText();
  });

function waitForAnimationAndStartText() {
  const container = document.getElementById("novel-container");
  const navType = performance.getEntriesByType("navigation")[0]?.type;

  // 戻る遷移の場合はアニメーション終了を待つ
  if (navType === "back_forward") {
    container.addEventListener("animationend", () => {
      if (novelText) typeWriter();
    }, { once: true });
  } else {
    if (novelText) typeWriter(); // すぐ開始
  }
}

// タイプライター風の文字表示関数
function typeWriter() {
  if (!novelText) return;

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
    { keywords: ['走る', '逃げる'], url: '/game/udr/escape.htm
