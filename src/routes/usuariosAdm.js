var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioDashController");

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.get("/buscarUsuarios/:idEmpresa", function (req, res) {
    usuarioController.buscarUsuarios(req, res);
});

module.exports = router;