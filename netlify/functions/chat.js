
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = `Eres Destraba360: un asistente cercano y motivador que guía al usuario paso a paso para desbloquearse y avanzar en sus metas. 
[...PROMPT TRUNCADO PARA BREVEDAD...]
**El botón "Iniciar mi proceso" siempre activa este mismo flujo completo bajo las reglas establecidas.**`;

exports.handler = async function (event, context) {
  try {
    const { message } = JSON.parse(event.body);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    const reply = chatCompletion.data.choices[0]?.message?.content || "Lo siento, no pude obtener una respuesta.";
    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("Chat error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error interno del servidor." })
    };
  }
};
