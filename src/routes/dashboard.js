var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");
var suporteController = require("../controllers/suporteController");


router.get("/maior-pico/:fkEmpresa", function(req, res) {
    dashboardController.maiorPico(req, res)
})

router.get("/menor-pico/:fkEmpresa", function(req, res) {
    dashboardController.menorPico(req, res)
})

router.get("/alertas-por-estufa/:fkEmpresa", function(req, res) {
    dashboardController.alertasPorEstufa(req, res)
})

router.get("/registroHoras/:fkEmpresa", function(req, res) {
    dashboardController.registroLeituraHoras(req, res)
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