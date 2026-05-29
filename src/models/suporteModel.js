var { GoogleGenAI } = require("@google/genai");
var chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

async function gerarResposta(mensagem) {
    try {
        const modeloIA = await chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Em um parágrafo responda de forma direta: ${mensagem}`
        });

        // Retorna apenas o texto puro da resposta
        return modeloIA.text;
    } catch (error) {
        console.error("ERRO DENTRO DA IA:", error);
        throw error;
    }
}

module.exports = {
    gerarResposta
};