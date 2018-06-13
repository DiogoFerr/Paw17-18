const express = require("express");
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const FuncController = require("../Controllers/funcionarioController");

router.get('/', function (req, res) {
    res.redirect('/index');
});

router.get('/index', function (req, res) {
    res.render('index');
});

router.delete('/admin', function (req, res) {
    FuncController.deleteFuncionario(res, (err) => {

    })
})

router.get('/admin', function (req, res) {
    FuncController.procurarUtilizadores(res, (err, result) => {
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