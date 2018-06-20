const express = require("express");
const router = express.Router();

const PacienteController = require("../controllers/pacienteController");


router.get('/', function (req, res) {
    PacienteController.procurarPacientes((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialConsultas", {
                pacientes: result
            });
        }
    });

});

module.exports = router;