const express = require("express");
const router = express.Router();
const passport = require('passport');
const FuncController = require("../Controllers/funcionarioController");

router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/index', function (req, res) {
    res.render('index');
});

router.get('/novoPaciente', function (req, res) {
    if (req.user[0].TipoFuncionario_idTipoFuncionario == 1) {
        res.render('novoPaciente');
    } else {
        res.redirect('admin');
    }
});

router.get('/deleteFuncionario', function (req, res) {
    let id = req.query.id;
    FuncController.deleteFuncionario(id, (err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.redirect("admin");
        }
    });
})

router.get('/admin', function (req, res) {
    FuncController.procurarUtilizadores((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("admin", {
                funcionarios: result
            });
        }
    });

});

router.get('/novoRegisto', function (req, res) {
    res.render('novoRegisto');
});

router.post('/novoRegisto', function (req, res) {
    FuncController.adicionarFuncionario(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.redirect("admin");
        }
    });
})
module.exports = router;