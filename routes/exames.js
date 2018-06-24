const express = require("express");
const router = express.Router();

const PacienteController = require("../controllers/pacienteController");
const TipoExamesController = require("../controllers/tipoExameController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientesExames((err, result) => {
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
    TipoExamesController.procurarExames((err, result) => {
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