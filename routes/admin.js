const express = require("express");
const router = express.Router();
const PacienteController = require("../controllers/pacienteController")
const FuncController = require("../controllers/funcionarioController");
const DepartamentoController = require("../controllers/departamentoController");
const TipoFuncController = require("../controllers/tipoFuncionarioController");
const TipoExamesController = require("../controllers/tipoExameController");
const SessaoController = require("../controllers/SessaoController");
const data = require('dateformat');
const numeroAdmin = 1;

function admin(req, res) {
    if (req.user[0].Departamento_idDepartamento === numeroAdmin) {
        return true;
    } else {
        res.redirect('/login');
    }
}

router.get('/', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        FuncController.procurarUtilizadores((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                res.render("paginaInicialAdmin", {
                    funcionarios: result
                });
            }
        });
    }
});

router.post('/novoFuncionario', function (req, res) {
    FuncController.adicionarFuncionario(req, (err) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            res.redirect("/admin");
        }
    });
});

router.get('/novoFuncionario', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        let departamentos, tipos;
        DepartamentoController.getDepartamentos((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                departamentos = result;
            }
        });
        TipoFuncController.getTipos((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                tipos = result;
                res.render('novoFuncionario', {
                    tipos: tipos,
                    departamentos: departamentos
                });

            }
        });
    }
});

router.post('/editarFuncionario', function (req, res) {
    let id = req.query.id;
    FuncController.editarFuncionario(id, req, (err) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            res.redirect("/admin");
        }
    })
});

router.get('/editarFuncionario', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        let id = req.query.id;
        let departamentos, tipos;
        DepartamentoController.getDepartamentos((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                departamentos = result;
            }
        });
        TipoFuncController.getTipos((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                tipos = result;
                res.render('editarFuncionario', {
                    id: id,
                    tipos: tipos,
                    departamentos: departamentos
                });

            }
        });
    }
});

router.get('/deleteFuncionario', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        let id = req.query.id;
        FuncController.deleteFuncionario(id, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                res.redirect("/admin");
            }
        });
    }
});

router.get('/pacientesAdmin', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        PacienteController.procurarPacientesRegistoTerminado((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].dataNascimento = data(result[i].dataNascimento, "dd-mm-yyyy");
                }
                res.render('pacientesAdmin', {
                    pacientes: result
                });
            }
        });
    }
});

router.get('/registosPacienteAdmin/:nus', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        let nus = req.params.nus;
        PacienteController.pacienteByNusRegistoTerminado(nus, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            };
            for (let i = 0; i < result.length; i++) {
                result[i].dataEntrada = data(result[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                result[i].dataSaida = data(result[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
            }
            res.render('registosPacienteAdmin', {
                pacientes: result
            });
        });
    }
});

router.get('/verServicosPaciente/:id', SessaoController.requireAuth, function (req, res) {
    let idRegisto = req.params.id;
    if (admin(req, res)) {
        let nus = req.params.nus;
        PacienteController.verServicosPaciente(idRegisto, (err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            };
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                result[i].dataEntrada = data(result[i].dataEntrada, "dd-mm-yyyy HH:MM:ss");
                result[i].dataSaida = data(result[i].dataSaida, "dd-mm-yyyy HH:MM:ss");
            }
            res.render('verServicosPaciente', {
                pacientes: result
            });
        });
    }
});

router.get('/tiposExame', SessaoController.requireAuth, function (req, res) {
    if (admin(req, res)) {
        let exames;
        TipoExamesController.getAllExames((err, result) => {
            if (err || err === false) {
                res.redirect('/erro');
            } else {
                exames = result;
                res.render('novoExame', {
                    exames: exames,
                });

            }
        });
    }
});

router.post('/adicionarExames', function (req, res) {
    TipoExamesController.adicionarTipoExame(req, (err) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            res.redirect('/admin/tiposExame');
        }
    });
});

module.exports = router;