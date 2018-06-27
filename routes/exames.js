const express = require("express");
const router = express.Router();
const data = require("dateformat");

const PacienteController = require("../controllers/pacienteController");
const TipoExamesController = require("../controllers/tipoExameController");
const ServicoController = require("../controllers/servicoController");
const RegistoController = require("../controllers/registoController");
const SessaoController = require("../controllers/SessaoController");
const numeroExames = 4;

function exames(req, res) {
    if (req.user[0].Departamento_idDepartamento === numeroExames) {
        return true;
    } else {
        res.redirect('/login');
    }
}

router.get('/', SessaoController.requireAuth, function (req, res) {
    if (exames(req, res)) {
        PacienteController.procurarPacientesExames((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                res.render("paginaInicialExames", {
                    pacientes: result
                });
            }
        });
    }
});


router.post('/realizados/:nus', function (req, res) {
    let NUS = req.params.nus;
    let idFuncionario = req.user[0].idFuncionario;
    let idRegisto;
    let prioridade;
    let tipoServico;
    ServicoController.vericarServico(NUS, (err, result) => {
        tipoServico = result[0].tipoServico_idTipoServico;
        if (tipoServico == 4) {
            prioridade = result[0].prioridade;
        }
        RegistoController.getIdRegistoByNus(NUS, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                idRegisto = result[0].idRegisto;
            }
            ServicoController.terminarServicoExame(req, idFuncionario, idRegisto, (err) => {
                if (err || err === false) {
                    res.end("Erro:" + err);
                } else if (tipoServico == 2) {
                    ServicoController.adicionarServicoTriagem(idRegisto, (err) => {
                        if (err || err === false) {
                            res.redirect('/erro');
                        } else {
                            res.redirect("/exames");
                        }
                    });
                } else {
                    ServicoController.adicionarServicoConsultas(idRegisto, prioridade, (err) => {
                        if (err || err === false) {
                            res.end("Erro2: " + err);
                        } else {
                            res.redirect("/exames");
                        }
                    })
                }
            });
        });
    });
})

router.get('/perfilPaciente/:nus', SessaoController.requireAuth, function (req, res) {
    if (exames(req, res)) {
        let NUS = req.params.nus;
        let pacientes;
        let descricao = "";
        PacienteController.getUserByNUS(NUS, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                result[0].dataNascimento = data(result[0].dataNascimento, "dd-mm-yyyy");
                pacientes = result[0];
                RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                    if (err || err === false) {
                        res.redirect('/erro');
                    } else {
                        var idRegisto = result[0].idRegisto;
                        ServicoController.buscarDescricao(idRegisto, (err, result) => {
                            result.forEach(element => {
                                if (element.descricao != null || element.descricao != "undefined") {
                                    descricao = descricao + "" + element.descricao + '\n';
                                }
                            });
                            if (err || err === false) {
                                res.redirect('/erro');
                            } else {
                                TipoExamesController.getAllExames((err, result) => {
                                    if (err || err == false) {
                                        res.redirect('/erro');
                                    } else {
                                        res.render("fichaPacienteExames", {
                                            paciente: pacientes,
                                            descricao: descricao,
                                            exames: result
                                        });
                                    }
                                })

                            }
                        });
                    }
                });
            }
        });
    }
});

router.get('/pacientesAtendidos', SessaoController.requireAuth, function (req, res){
    if (exames(req, res)) {
        var userid = req.user[0].idFuncionario;
        PacienteController.pacientesAtendidosExame(userid, (err, result) => {
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
    }
});

module.exports = router;