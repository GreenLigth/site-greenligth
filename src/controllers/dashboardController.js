var dashboardModel = require("../models/dashboardModel");

function maiorPico(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.maiorPico(fkEmpresa, data, estufa)
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
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.menorPico(fkEmpresa, data, estufa)
        .then(resultado => {
            res.status(200).json(resultado[0]);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function alertasPorEstufa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.alertasPorEstufa(fkEmpresa, data, estufa)
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
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.registroLeituraHoras(fkEmpresa, data, estufa)
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
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.sensoresEmAlertaPorEstufa(fkEmpresa, data, estufa)
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
    var data = req.query.data;
    var estufa = req.query.estufa;

    dashboardModel.totalSensores(fkEmpresa, data, estufa)
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
    alertasPorEstufa,
    registroLeituraHoras,
    sensoresEmAlertaPorEstufa,
    totalSensores
}