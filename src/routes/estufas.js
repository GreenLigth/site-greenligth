const express = require("express");
const router = express.Router();

const estufaController = require("../controllers/estufaController");

router.post("/cadastrarEstufa", function (req, res) {
    estufaController.cadastrarEstufa(req, res);
});

module.exports = router;