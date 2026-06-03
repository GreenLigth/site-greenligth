var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");
var usuarioDashController = require("../controllers/usuarioDashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/login", function (req, res) {
    usuarioController.autenticar(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioDashController.cadastrarUsuario(req, res);
});

module.exports = router;