var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController")

router.get("/registros", function(req, res) {
    dashboardController.listarRegistros(req, res)
})
router.get("/maior-pico", function(req, res) {
    dashboardController.maiorPico(req, res)
})
router.get("/media-mensal", function(req, res) {
    dashboardController.mediaLuzMensal(req, res)
})
router.get("/contagem-status", function(req, res) {
    dashboardController.contagemStatus(req, res)
})
router.get("/media-por-mes", function(req, res) {
    dashboardController.mediaMensalPorMes(req, res)
})
router.get("/alerta-por-estufa", function(req, res) {
    dashboardController.sensoresEmAlertaPorEstufa(req, res)
})
router.get("/total-sensores", function(req, res) {
    dashboardController.totalSensores(req, res)
})


module.exports = router;