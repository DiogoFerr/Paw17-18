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

router.get('/perfilPaciente/:nus', function (req, res) {
    let NUS = req.params.nus;
    PacienteController.getUserByNUS(NUS, (err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            console.log(result[0]);
            res.render("fichaPaciente", {
                paciente: result[0]
            });
        }
    });
});

module.exports = router;