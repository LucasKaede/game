function generateStory() {
    const inputField = document.getElementById('inputField');
    const storyDiv = document.getElementById('story');
    const inputText = inputField.value.trim();

    let story = '';

    switch (inputText) {
        case '火星':
            story = '火星に着いた私たちは、未知の生物と遭遇した。彼らは友好的で、火星の奥深くには美しい秘密の庭があった。';
            break;
        case '海':
            story = '海辺での冒険が始まった。波の音とともに、失われた宝物の地図が見つかり、数々の試練が待っていた。';
            break;
        case '空':
            story = '空を飛ぶ夢を叶えた私たちは、空中の楽園で数々の不思議な生物たちと出会った。';
            break;
        case '森':
            story = '森の奥深くで、古代の遺跡を発見した。その遺跡には、人類の歴史を覆すような秘密が隠されていた。';
            break;
        default:
            story = '入力された文字に応じたストーリーは存在しません。別の言葉を試してみてください。';
            break;
    }

    storyDiv.textContent = story;
}
