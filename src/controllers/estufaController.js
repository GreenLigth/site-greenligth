const estufaModel = require("../models/estufaModel");

function cadastrarEstufa(req, res) {
    const nome = req.body.nome;
    const uf = req.body.uf;
    const cidade = req.body.cidade;
    const estrada = req.body.estrada;
    const km = req.body.km;
    const fkEmpresa = req.body.fkEmpresa;

    if (nome == undefined || uf == undefined || cidade == undefined || estrada == undefined || km == undefined || fkEmpresa == undefined) {
        res.status(400).send("Todos os campos de cadastro da estufa estão indefinidos!");
    } else {
        estufaModel.cadastrarEstufa(nome, uf, cidade, estrada, km, fkEmpresa)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("\nHouve um erro ao realizar o cadastro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarEstufa
};