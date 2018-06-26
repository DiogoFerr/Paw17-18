const express = require("express");
const router = express.Router();
const data = require("dateformat");

const PacienteController = require("../controllers/pacienteController");
const TipoExamesController = require("../controllers/tipoExameController");
const ServicoController = require("../controllers/servicoController");
const RegistoController = require("../controllers/registoController");
const SessaoController = require("../controllers/SessaoController");

router.get('/', function (req, res) {
    PacienteController.procurarPacientesExames((err, result) => {
        if (err || err === false) {
           res.redirect('/erro');
        } else {
            res.render("paginaInicialExames", {
                pacientes: result
            });
        }
    });
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

router.get('/perfilPaciente/:nus', function (req, res) {
    let NUS = req.params.nus;
    let paciente;
    PacienteController.getUserByNUS(NUS, (err, result) => {
        if (err || err === false) {
           res.redirect('/erro');
        } else {
            result[0].dataNascimento = data(result[0].dataNascimento, "dd-mm-yyyy");
            paciente = result[0];
        }
    });
    TipoExamesController.getAllExames((err, result) => {
        if (err || err == false) {
           res.redirect('/erro');
        } else {
            res.render("fichaPacienteExames", {
                exames: result,
                paciente: paciente
            });
        }
    })

})
module.exports = router;