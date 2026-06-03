
var perfilModel = require("../models/perfilModel");

function buscarPerfil(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        return res.status(400).send("O id do usuário está indefinido!");
    }

    perfilModel.buscarPorId(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Usuário não encontrado.");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function editarPerfil(req, res) {
    var { idUsuario, email, nome, senha, empresa } = req.body;

    if (!idUsuario || !email || !nome || !senha) {
        return res.status(400).send("Dados incompletos para edição!");
    }

    perfilModel.editar(idUsuario, email, nome, senha)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    buscarPerfil,
    editarPerfil
};