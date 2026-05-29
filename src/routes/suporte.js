var { GoogleGenAI } = require("@google/genai"); 
var express = require("express");
var path = require("path");
var cors = require("cors"); 

var app = express(); 


app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    if (!pergunta) {
        return res.status(400).json({ error: "A pergunta é obrigatória." });
    }

    try {
        const resultado = await gerarResposta(pergunta); 
        
        res.json({ resultado });
    } catch (error) {
        console.error("Erro na rota /perguntar:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao chamar a IA' });
    }
});

var PORTA_SERVIDOR = process.env.PORTA || 3333;
app.listen(PORTA_SERVIDOR, () => {
    console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
});