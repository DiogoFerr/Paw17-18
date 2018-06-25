const express = require("express");
const router = express.Router();
const data = require("dateformat");

const PacienteController = require("../controllers/pacienteController");
const TipoExamesController = require("../controllers/tipoExameController");
const ServicoController = require("../controllers/servicoController");
const RegistoController = require("../controllers/registoController");


router.get('/', function (req, res) {
    PacienteController.procurarPacientesExames((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialExames", {
                pacientes: result
            });
        }
    });

});


router.post('/realizados/:nus', function (req, res) {
    let NUS = req.params.nus;
    let idFuncionario = req.user.idFuncionario;
    let idRegisto;
    let prioridade;
    ServicoController.vericarServico(NUS, (err, servico) => {
        RegistoController.getIdRegistoByNus(NUS, (err, result) => {
            if (err || err === false) {
                res.end("Erro: " + err);
            } else {
                idRegisto = result[0].idRegisto;
                if (servico[0].tipoServico_idServico == 4) {
                    prioridade = result[0].prioridade;
                }
            }
        });
        ServicoController.terminarServicoExame(req , idFuncionario, idRegisto, (err) => {
            if (err || err === false) {
                res.end("Erro:" + err);
            }
        });
        if (err || err === false) {
            res.end("Erro:" + err);
        } else if (servico[0].tipoServico_idServico == 2) {
            ServicoController.adicionarServicoTriagem(idRegisto, (err) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {
                    res.redirect("/exames");
                }
            });
        } else {
            ServicoController.adicionarServicoConsultas(idRegisto, prioridade, (err) => {
                if (err || err === false) {
                    res.end("Erro: " + err);
                } else {
                    res.redirect("/exames");
                }
            })
        }
    });
})

router.get('/perfilPaciente/:nus', function (req, res) {
    let NUS = req.params.nus;
    let paciente;
    PacienteController.getUserByNUS(NUS, (err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            result[0].dataNascimento = data(result[0].dataNascimento, "dd-mm-yyyy");
            paciente = result[0];
        }
    });
    TipoExamesController.getAllExames((err, result) => {
        if (err || err == false) {
            res.end("Erro: " + err);
        } else {
            res.render("fichaPacienteExames", {
                exames: result,
                paciente: paciente
            });
        }
    })

})
module.exports = router;