const express = require("express");
const router = express.Router();
const PacienteController = require("../controllers/pacienteController");
const RegistoController = require("../controllers/registoController");
const ServicoController = require("../controllers/servicoController");
const SessaoController = require("../controllers/SessaoController");
const numeroRececao = 6;

function rececao(req, res) {
    if (req.user[0].Departamento_idDepartamento === numeroRececao) {
        return true;
    } else {
        res.redirect('/login');
    }
}

function registarServico(NUS, req, res) {
    PacienteController.getUserByNUS(NUS, (err, result) => {
        var idPaciente = result[0].idPaciente;
        RegistoController.verificaExistenciaRegisto(NUS, (err, result) => {
            if (result[0].total === 0) {
                RegistoController.adicionarRegisto(idPaciente, (err) => {
                    if (err || err === false) {
                        res.redirect('/erro');
                    } else {
                        RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                            if (err || err === false) {
                                res.redirect('/erro');
                            } else {
                                var idRegisto = result[0].idRegisto;
                            }
                            ServicoController.adicionarServicoTriagem(idRegisto, (err) => {
                                if (err || err === false) {
                                    res.redirect('/erro');
                                } else {
                                    res.redirect('/receccao');
                                }
                            });
                        });
                    }
                });
            } else {
                console.log("Já tem um registo associado sem data de saída");
                res.redirect('/receccao');
            }
        });
    });
}

router.get('/', SessaoController.requireAuth, function (req, res) {
    if (rececao(req, res))
        res.render('pesquisarPaciente');
});

router.post('/pesquisar', function (req, res) {
    var NUS = req.body.NUS;
    PacienteController.countUserByNUS(NUS, (err, result) => {
        if (err) {
            res.end('Erro:' + err);
        } else {
            if (result[0].total === 1) {
                registarServico(NUS, req, res);
            } else {
                res.redirect('novoPaciente');
            }
        }
    });
});

router.get('/novoPaciente', SessaoController.requireAuth, function (req, res) {
    if (rececao(req, res))
        res.render('novoPaciente');
});


router.post('/novoPaciente', function (req, res) {
    var NUS = req.body.NUS;
    PacienteController.adicionarPaciente(req, (err) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            registarServico(NUS, req, res);
        }
    });
});

module.exports = router;
