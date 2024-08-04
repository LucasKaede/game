function generateStory() {
    const inputField = document.getElementById('inputField');
    const storyDiv = document.getElementById('story');
    const storyImage = document.getElementById('storyImage');
    const inputText = inputField.value.trim();

    let story = '';
    let imageUrl = '';

    switch (inputText) {
        case '火星':
            story = '火星に着いた私たちは、未知の生物と遭遇した。彼らは友好的で、火星の奥深くには美しい秘密の庭があった。';
            imageUrl = 'https://example.com/images/mars.jpg'; // 火星の画像URLに置き換えてください
            break;
        case '海':
            story = '海辺での冒険が始まった。波の音とともに、失われた宝物の地図が見つかり、数々の試練が待っていた。';
            imageUrl = 'https://example.com/images/ocean.jpg'; // 海の画像URLに置き換えてください
            break;
        case '空':
            story = '空を飛ぶ夢を叶えた私たちは、空中の楽園で数々の不思議な生物たちと出会った。';
            imageUrl = 'https://example.com/images/sky.jpg'; // 空の画像URLに置き換えてください
            break;
        case '森':
            story = '森の奥深くで、古代の遺跡を発見した。その遺跡には、人類の歴史を覆すような秘密が隠されていた。';
            imageUrl = 'https://example.com/images/forest.jpg'; // 森の画像URLに置き換えてください
            break;
        default:
            story = '入力された文字に応じたストーリーは存在しません。別の言葉を試してみてください。';
            imageUrl = ''; // デフォルト画像URLが必要なら指定してください
            break;
    }

    storyDiv.textContent = story;
    storyImage.src = imageUrl;
}
