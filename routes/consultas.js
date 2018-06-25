const express = require("express");
const router = express.Router();
const data = require('dateformat');
const PacienteController = require("../controllers/pacienteController");
const SessaoController = require("../controllers/SessaoController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientesConsultas((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            for (let i = 0 ; i < result.length ; i++) {
                result[i].dataEntrada = data(result[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
            }
            res.render("paginaInicialConsultas", {
                pacientes: result
            });
        }
    });

});

router.get('/perfilPaciente/:nus', function (req, res) {
    let NUS = req.params.nus;
    PacienteController.getUserByNUS(NUS, (err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("fichaPaciente", {
                paciente: result[0]
            });
        }
    });
});

module.exports = router;