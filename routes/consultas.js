const express = require("express");
const router = express.Router();
const data = require('dateformat');
const PacienteController = require("../controllers/pacienteController");
const ServicoController = require("../controllers/servicoController");
const SessaoController = require("../controllers/SessaoController");
const RegistoController = require("../controllers/registoController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientesConsultas((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            for (let i = 0; i < result.length; i++) {
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
            console.log(result[0]);
            res.render("fichaPacienteConsultas", {
                paciente: result[0]
            });
        }
    });
});


router.post('/resultado/:nus', function (req, res) {
    let NUS = req.params.nus;
    let opcao = req.body.opcao;
    let idRegisto;
    let idFuncionario = req.user[0].idFuncionario;
    let prioridade;
    switch (opcao) {
        case "Terminado":
            RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {
                    idRegisto = result[0].idRegisto;
                }
                ServicoController.setTerminado(idFuncionario, idRegisto, req, (err) => {
                    if (err || err === false) {
                        res.end("Erro: " + err);
                    } else {
                        RegistoController.fecharRegisto(idRegisto, (err) => {
                            if (err || err === false) {
                                res.end("Erro: " + err);
                            } else {
                                res.redirect('/');
                            }
                        })
                    }
                });
            });
            break;
        case "Exame":
            RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                console.log("entrei 1");
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {
                    idRegisto = result[0].idRegisto;
                    ServicoController.vericarServico(NUS, (err, result) => {
                        console.log("entrei 2");
                        if (err || err === false) {
                            res.end("Erro: " + err);
                        } else {
                            prioridade = result[0].prioridade;
                            ServicoController.terminarServicoConsulta(req, idFuncionario, idRegisto, prioridade, (err) => {
                                console.log("entrei 3");
                                if (err || err === false) {
                                    res.end("Erro: " + err);
                                } else {
                                    ServicoController.adicionarServicoExamesConsultas(idRegisto, prioridade, (err) => {
                                        console.log("entrei 4");
                                        if (err || err === false) {
                                            res.end("Erro: " + err);
                                        } else {
                                            res.redirect('/');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            break;
        case "Internamento":
            RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {
                    idRegisto = result[0].idRegisto;
                    ServicoController.vericarServico(NUS, (err, result) => {
                        if (err || err === false) {
                            res.end("Erro: " + err);
                        } else {
                            prioridade = result[0].prioridade;
                            ServicoController.terminarServicoConsulta(req, idFuncionario, idRegisto, prioridade, (err) => {
                                if (err || err === false) {
                                    res.end("Erro: " + err);
                                } else {
                                    ServicoController.adicionarServicoInternamento(idRegisto, prioridade, (err) => {
                                        if (err || err === false) {
                                            res.end("Erro: " + err);
                                        } else {
                                            res.redirect('/');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            break;
    }
});

module.exports = router;