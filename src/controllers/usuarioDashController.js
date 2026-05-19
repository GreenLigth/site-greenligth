var usuarioModel = require("../models/usuarioDashModel");


//Cadastro Usuario 


function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastroUsuario.html
    var nome = req.body.nome;
    var email = req.body.email;
    var nivelAcesso = req.body.cargo;
    var nomeEstufa = req.body.nomeEstufa;
    var senha = req.body.senha;
    var fkEmpresa = req.body.fkEmpresa;
    var fkSuperior = req.body.fkSuperior

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (nivelAcesso == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (nomeEstufa == undefined) {
        res.status(400).send("O nome da sua estufa está undefined");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A empresa está undefined!"); 
    }else if (fkSuperior == undefined) {
        res.status(400).send("O superior está undefined!"); }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUsuario(nome, email, nivelAcesso, nomeEstufa, senha, fkEmpresa,fkSuperior)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarUsuarios(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido no Controller!");
    } else {
        usuarioModel.buscarUsuarios(idEmpresa)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum usuário encontrado.");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarUsuario,
    buscarUsuarios
};

