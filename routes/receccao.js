const express = require("express");
const router = express.Router();
const empty = require("is-empty");
const PacienteController = require("../controllers/pacienteController");
const RegistoController = require("../controllers/registoController");
const ServicoController = require("../controllers/servicoController");
router.get('/', function (req, res) {
    res.render('pesquisarPaciente');
});

router.post('/pesquisar', function (req, res) {
    let NUS = req.body.NUS;
    console.log(NUS);
    PacienteController.countUserByNUS(NUS, (err, result) => {
        if (result[0].total === 1) {
            res.redirect('/receccao');
        } else {
            res.redirect('novoPaciente');
        }
    });
});

router.get('/novoPaciente', function (req, res) {
    res.render('novoPaciente');
})


router.post('/novoPaciente', function (req, res) {
    let idFunc = 1;
    var NUS = req.body.nus;
    PacienteController.adicionarPaciente(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            PacienteController.getUserByNUS(NUS, (err, result) => {
                var idPaciente = result[0].idPaciente;
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
            });
        }
    });
});

module.exports = router;
