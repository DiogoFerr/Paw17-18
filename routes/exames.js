const express = require("express");
const router = express.Router();

const PacienteController = require("../controllers/pacienteController");
const ExamesController = require("../controllers/examesController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientes((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialExames", {
                pacientes: result
            });
        }
    });

});


router.get('/perfilPaciente', function (req, res) {
    ExamesController.procurarExames((err, result) => {
        if (err || err == false) {
            res.end("Erro: " + err);
        } else {
            res.render("fichaPacienteExames",{
                exames : result
            });
        }
    })
})
module.exports = router;