async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/prompthero/openjourney",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      dont_load_model: "true",
      wait_for_model: "true",
      retry_on_error: "true",
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

const form = document.getElementById("input-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const apiKey = "00664e51-b178-f614-6e24-6b1bb78c77f7:fx";
  const inputText = document.getElementById("input-text").value;
  const targetLang = "EN";
  const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
    inputText
  )}&target_lang=${targetLang}`;

  try {
    const translationResponse = await fetch(apiUrl);
    if (!translationResponse.ok) {
      throw new Error("Translation request failed");
    }
    const translationData = await translationResponse.json();
    const translatedText = translationData.translations[0].text;
    console.log(translatedText);

    const response = await query({ inputs: translatedText });
    const img = document.createElement("img");
    const imageUrl = URL.createObjectURL(response);
    img.src = imageUrl;
    const container = document.getElementById("image");
    container.appendChild(img);
  } catch (error) {
    console.error("Error:", error);
  }
});
