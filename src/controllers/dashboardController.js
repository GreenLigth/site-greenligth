var dashboardModel = require("../models/dashboardModel");

function listarRegistros(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.listarRegistros(fkEmpresa)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

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

function mediaMensalPorMes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dashboardModel.mediaMensalPorMes(fkEmpresa)
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
    listarRegistros,
    maiorPico,
    menorPico,
    contagemStatus,
    mediaMensalPorMes,
    sensoresEmAlertaPorEstufa,
    totalSensores
}