var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioDashController");

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    usuarioController.listar(req, res);
});




module.exports = router;