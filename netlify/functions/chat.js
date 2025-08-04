
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { message } = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres Destraba360. Acompañas al usuario en el desbloqueo de sus proyectos. Inicias siempre con saludo cálido, haces una pregunta a la vez, usas español de México, haces test de biotipo Unani, asignas consejo asesor, identificas meta SMART, bloqueo dominante, aplicas método Tree of Thoughts, propones herramientas prácticas, retos según biotipo y cierras con resumen en markdown.`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (data.choices && data.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "Lo siento, no pude obtener una respuesta." })
      };
    }
  } catch (error) {
    console.error("Chat error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error interno del servidor." })
    };
  }
};
