const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body || '{}');

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Actúa como un coach experto llamado Destraba360." },
        { role: "user", content: message }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al generar respuesta", detail: error.message })
    };
  }
};