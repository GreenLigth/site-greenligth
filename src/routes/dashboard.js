var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");
var suporteController = require("../controllers/suporteController");


router.get("/registros/:fkEmpresa", function(req, res) {
    dashboardController.listarRegistros(req, res)
})

router.get("/maior-pico/:fkEmpresa", function(req, res) {
    dashboardController.maiorPico(req, res)
})

router.get("/menor-pico/:fkEmpresa", function(req, res) {
    dashboardController.menorPico(req, res)
})

router.get("/contagem-status/:fkEmpresa", function(req, res) {
    dashboardController.contagemStatus(req, res)
})

router.get("/media-por-mes/:fkEmpresa", function(req, res) {
    dashboardController.mediaMensalPorMes(req, res)
})

router.get("/alerta-por-estufa/:fkEmpresa", function(req, res) {
    dashboardController.sensoresEmAlertaPorEstufa(req, res)
})

router.get("/total-sensores/:fkEmpresa", function(req, res) {
    dashboardController.totalSensores(req, res)
})

router.post("/perguntar", function(req, res) {
    suporteController.perguntar(req, res);
});

module.exports = router;