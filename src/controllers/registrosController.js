var registrosModel = require("../models/registrosModel");

function buscarRegistros(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está indefinida!");
    } else {

        registrosModel.buscarRegistros(fkEmpresa)
            .then(function(resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum registro encontrado");
                }

            }).catch(function(erro) {
                console.log(erro);
                console.log("Erro ao buscar registros:", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarRegistros
}