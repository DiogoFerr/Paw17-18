const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const registoController = require("../controllers/registoController");
const departamentoController = require("../controllers/departamentoController");
const data = require('dateformat');

router.get('/', function (req, res) {
    pacienteController.procurarPacientesRegistoTerminado((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            registoController.countAllRegistosTerminados((err, count) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                }
                totalPacientes = count[0].total;
                //funcionario = req.user[0].nomeFuncionario;
                for (let i = 0; i < result.length; i++) {
                    result[i].dataEntrada = data(result[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                    result[i].dataSaida = data(result[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
                }
                res.render("paginaInicialGestor", {
                    pacientes: result,
                    totalPacientes
                });
            });
        }
    });
});

router.get('/pesquisaDepartamento', function (req, res) {
    departamentoController.getDepartamentosDoentes((err, result) => {
        if (err || err === false) {
            res.end("ERRO: " + err);
        } else {
            res.render("pesquisarPacientesDepartamento", {
                departamentos: result,
            });
        }
    });
});

router.post('/mostrarPacientes', function (req, res) {
    let id = req.body.departamento;
    departamentoController.countNumeroDoentesAtendidosPDepartamento(id ,(err, result) => {
        if (err || err === false) {
            res.end("ERRO: " + err);
        } else {
            console.log(result[0].total);
            res.render("mostrarPacientes", {
                nmrpaciente: result[0].total,
            });
        }
    });
});

router.get('/mostrarPacientes', function (req, res) {
  res.render('mostrarPacientes');
});

module.exports = router;