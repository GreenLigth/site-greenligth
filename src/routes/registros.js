var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/");

router.post("/buscarRegistros", function (req, res) {
    usuarioController.buscarRegistros(req, res);
})

module.exports = router;
