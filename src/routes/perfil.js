var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/perfilController");

router.get("/:idUsuario", function (req, res) {
    usuarioController.buscarPerfil(req, res);
});

router.put("/editar", function (req, res) {
    usuarioController.editarPerfil(req, res);
});

module.exports = router;
