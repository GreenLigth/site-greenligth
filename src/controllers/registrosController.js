var registrosModel = require("../models/registrosModel");

function buscarRegistros(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido no Controller!");
    } else {
        registrosModel.buscarRegistros(idEmpresa)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum registro encontrado para esta empresa.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os registros! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarRegistros
};