var suporteModel = require("../models/suporteModel");

async function perguntar(req, res) {
    const pergunta = req.body.pergunta;

    if (!pergunta) {
        return res.status(400).json({ error: "A pergunta é obrigatória." });
    }

    try {
        const resultado = await suporteModel.gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        console.error("Erro no suporteController:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao gerar resposta.' });
    }
}

module.exports = {
    perguntar
};