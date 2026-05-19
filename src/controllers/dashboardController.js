var dashboardModel = require("../models/dashboardModel");

function listarRegistros(req, res) {
    dashboardModel.listarRegistros()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log("\nHouve um erro ao listar os registros! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function maiorPico(req, res) {
    dashboardModel.maiorPico()
        .then(function(resultado) {
            res.status(200).json(resultado.length > 0 ? resultado[0] : {});
        })
        .catch(function(erro) {
            console.log("\nHouve um erro ao buscar o maior pico! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function mediaLuzMensal(req, res) {
    dashboardModel.mediaLuzMensal()
        .then(function(resultado) {
            res.status(200).json(resultado.length > 0 ? resultado[0] : { mediaLuz: 0 });
        })
        .catch(function(erro) {
            console.log("\nHouve um erro ao buscar a média mensal! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function contagemStatus(req, res) {
    dashboardModel.contagemStatus()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log("\nHouve um erro na contagem de status! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function mediaMensalPorMes(req, res) {
    dashboardModel.mediaMensalPorMes()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log("\nHouve um erro na média mensal por mês! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function sensoresEmAlertaPorEstufa(req, res) {
    dashboardModel.sensoresEmAlertaPorEstufa()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log("\nHouve um erro nos alertas por estufa! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
function totalSensores(req, res) {
    dashboardModel.totalSensores()
        .then(function(resultado) {
            res.status(200).json(resultado.length > 0 ? resultado[0] : { total: 0 });
        })
        .catch(function(erro) {
            console.log("\nHouve um erro ao buscar o total de sensores! Erro: ", erro.sqlMessage);
            res.status(500).json({ erro: erro });
        });
}
 
module.exports = {
    listarRegistros,
    maiorPico,
    mediaLuzMensal,
    contagemStatus,
    mediaMensalPorMes,
    sensoresEmAlertaPorEstufa,
    totalSensores
}