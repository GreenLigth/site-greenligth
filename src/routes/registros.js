var express = require("express");
var router = express.Router();

var registrosController = require("../controllers/registrosController");

router.get("/buscarRegistros/:fkEmpresa", function (req, res) {
    registrosController.buscarRegistros(req, res);
});

module.exports = router;    