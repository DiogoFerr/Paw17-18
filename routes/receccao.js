const express = require("express");
const router = express.Router();
const PacienteController = require("../controllers/pacienteController");
const RegistoController = require("../controllers/registoController");
const ServicoController = require("../controllers/servicoController");

function registarServico(NUS, req, res) {
    PacienteController.getUserByNUS(NUS, (err, result) => {
        var idPaciente = result[0].idPaciente;
        RegistoController.verificaExistenciaRegisto(NUS, (err, result) => {
            if (result[0].total === 0) {
                RegistoController.adicionarRegisto(idPaciente, (err) => {
                    if (err || err === false) {
                        res.end("Erro: " + err);
                    } else {
                        RegistoController.getIdRegistoByNus(NUS, (err, result) => {
                            if (err || err === false) {
                                res.end("Erro: " + err);
                            } else {
                                var idRegisto = result[0].idRegisto;
                            }
                            ServicoController.adicionarServicoTriagem(idPaciente, idRegisto, (err) => {
                                if (err || err === false) {
                                    res.end("Erro: " + err);
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



router.get('/', function (req, res) {
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

router.get('/novoPaciente', function (req, res) {
    res.render('novoPaciente');
})


router.post('/novoPaciente', function (req, res) {
    var NUS = req.body.nus;
    PacienteController.adicionarPaciente(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            registarServico(NUS, req, res);
        }
    });
});

module.exports = router;
