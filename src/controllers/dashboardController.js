var dashboardModel = require("../models/dashboardModel");


function maiorPico(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.maiorPico(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado[0]);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function menorPico(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.menorPico(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado[0]);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function contagemStatus(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.contagemStatus(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function registroLeituraHoras(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.registroLeituraHoras(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function sensoresEmAlertaPorEstufa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.sensoresEmAlertaPorEstufa(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function totalSensores(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.totalSensores(fkEmpresa)
        .then(resultado => {
            res.status(200).json(resultado[0]);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    maiorPico,
    menorPico,
    contagemStatus,
    registroLeituraHoras,
    sensoresEmAlertaPorEstufa,
    totalSensores
}