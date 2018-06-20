const express = require("express");
const router = express.Router();
const data = require('dateformat');

const PacienteController = require("../controllers/pacienteController");
const servicoController = require("../controllers/servicoController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientes((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialTriagem", {
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
            result[0].dataNascimento = data(result[0].dataNascimento, "dd-mm-yyyy");
            res.render("fichaPaciente", {
                paciente: result[0]
            });
        }
    });
});

router.post('/setPrioridadeUser/:nus', function (req, res){
    let nus = req.params.nus;
    servicoController.setPrioridade(req, nus, (err) => {
        if (err || err === false){
            res.end("Erro: " + err);
        }else{
            res.redirect('triagem');
        }
    });
});

module.exports = router;