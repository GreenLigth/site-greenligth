var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/buscarUsuarios/:idEmpresa", function (req, res) {
    usuariosController.buscarUsuarios(req, res);
});


module.exports = router;