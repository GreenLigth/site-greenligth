var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/perfilController");

// Rota para buscar dados do perfil
router.get("/perfil/:idUsuario", function (req, res) {
    usuarioController.buscarPerfil(req, res);
});

// Rota para atualizar os dados
router.put("/editar", function (req, res) {
    usuarioController.editarPerfil(req, res);
});

module.exports = router;
