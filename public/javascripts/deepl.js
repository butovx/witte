const form = document.getElementById('input-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const apiKey = '00664e51-b178-f614-6e24-6b1bb78c77f7:fx';
    const inputText = document.getElementById('input-text').value;
    const targetLang = 'EN';
    const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
        inputText
    )}&target_lang=${targetLang}`;

    try {
        const translationResponse = await fetch(apiUrl);
        if (!translationResponse.ok) {
            throw new Error('Translation request failed');
        }
        const translationData = await translationResponse.json();
        const translatedText = translationData.translations[0].text;
        console.log(translatedText);
    } catch (error) {
        console.error('Error:', error);
    }
});
