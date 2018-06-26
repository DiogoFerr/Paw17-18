const express = require("express");
const router = express.Router();
const FuncController = require("../controllers/funcionarioController");
const DepartamentoController = require("../controllers/departamentoController");
const TipoFuncController = require("../controllers/tipoFuncionarioController");
const TipoExamesController = require("../controllers/tipoExameController");
const SessaoController = require("../controllers/SessaoController");

router.get('/', function (req, res) {
    FuncController.procurarUtilizadores((err, result) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            res.render("paginaInicialAdmin", {
                funcionarios: result
            });
        }
    });
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

router.get('/novoFuncionario', function (req, res) {
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

router.get('/editarFuncionario', function (req, res) {
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
});

router.get('/deleteFuncionario', function (req, res) {
    let id = req.query.id;
    FuncController.deleteFuncionario(id, (err, result) => {
        if (err || err === false) {
            res.redirect('/erro');
        } else {
            res.redirect("/admin");
        }
    });
});

router.get('/tiposExame', function (req, res) {
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