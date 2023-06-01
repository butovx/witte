const text = require('./deepl');
async function query(data) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/wavymulder/Analog-Diffusion',
        {
            headers: {
                Authorization: 'Bearer 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',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

const form = document.getElementById('input-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputText = text;
    const response = await query({ inputs: inputText });
    const img = document.createElement('img');
    const imageUrl = URL.createObjectURL(response);
    img.src = imageUrl;
    const container = document.getElementById('image');
    container.appendChild(img);
});
