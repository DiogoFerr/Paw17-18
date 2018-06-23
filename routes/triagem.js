const express = require("express");
const router = express.Router();
const data = require('dateformat');

const PacienteController = require("../controllers/pacienteController");
const servicoController = require("../controllers/servicoController");
const registoController = require("../controllers/registoController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientesTriagem((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialTriagem", {
                pacientes: result
            });
        }
    });

});

router.get('/pacientesAtendidos', function (req, res) {
    console.log(req.user);
    var userid = req.user[0].idFuncionario;
    PacienteController.pacientesAtendidosTriagem(userid, (err, result) => {
        if (err || err === false) {
            res.end("Erro:" + err);
        } else {
            for (let i = 0; i < result.length; i++) {
                result[i].dataEntrada = data(result[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                result[i].dataSaida = data(result[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
            }
            res.render('pacientesAtendidos', {
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

router.post('/setPrioridadeUser/:nus', function (req, res) {
    var idFuncionario = req.user[0].idFuncionario;
    var nus = req.params.nus;
    registoController.getIdRegistoByNus(nus, (err, result) => {
        console.log(result[0].idRegisto + "registo");
        var idRegisto = result[0].idRegisto;
        if (req.body.paciente_status != "Exame") {
            servicoController.setPrioridade(idFuncionario, idRegisto, req, (err) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {

                    res.redirect('/triagem');
                }
            });
        } else {
            
        }
    });
});

module.exports = router;