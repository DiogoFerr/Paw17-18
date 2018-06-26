const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const registoController = require("../controllers/registoController");
const departamentoController = require("../controllers/departamentoController");
const funcionarioController = require("../controllers/funcionarioController");
const data = require('dateformat');

router.get('/', function (req, res) {
    pacienteController.procurarPacientesRegistoTerminado((err, result) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            registoController.countAllRegistosTerminados((err, count) => {
                if (err || err === false) {
                    res.redirect('/erro');
                }
                totalPacientes = count[0].total;
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
            res.redirect('/erro');
        } else {
            res.render("pesquisarPacientesDepartamento", {
                departamentos: result,
            });
        }
    });
});

router.get('/pesquisaFuncionario', function (req, res) {
    res.render("pesquisaPacientesFuncionario");
});

router.post('/mostrarPacientes', function (req, res) {
    let id = req.body.departamento;
    let idFuncionario = req.body.numFunc;
    if (id != undefined) {
        departamentoController.countNumeroDoentesAtendidosPDepartamento(id, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                departamentoController.getTotalDoentesAtendidosPDepartamento(id, (err, paciente) => {
                    if (err || err === false) {
                        res.redirect('/erro');
                    } else {
                        for (let i = 0; i < paciente.length; i++) {
                            paciente[i].dataEntrada = data(paciente[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                            paciente[i].dataSaida = data(paciente[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
                        }
                        res.render("mostrarPacientes", {
                            nmrpaciente: result[0].total,
                            pacientes: paciente
                        });
                    }
                });
            }
        });
    } else {
        funcionarioController.countDoentesAtendidos(idFuncionario, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                funcionarioController.getAllDoentesFuncionario(idFuncionario, (err, paciente) => {
                    if (err || err === false) {
                        res.redirect('/erro');
                    } else {
                        for (let i = 0; i < paciente.length; i++) {
                            paciente[i].dataEntrada = data(paciente[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                            paciente[i].dataSaida = data(paciente[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
                        }
                        res.render("mostrarPacientes", {
                            nmrpaciente: result[0].total,
                            pacientes: paciente
                        });
                    }

                });
            }
        });
    }

});

router.get('/mostrarPacientes', function (req, res) {
    res.render('mostrarPacientes');
});

module.exports = router;