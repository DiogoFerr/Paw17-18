const express = require("express");
const router = express.Router();
const FuncController = require("../Controllers/funcionarioController");

router.get('/', function (req, res) {
    res.redirect('/index');
});
router.get('/index', function (req, res) {
    res.render('index');
});
router.get('/admin', function (req, res) {
    res.render('admin');
});
router.get('/novoRegisto', function (req, res) {
    res.render('novoRegisto');
});

router.post('/novoRegisto', function (req, res) {
    let data = FuncController.adicionarFuncionario(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("admin");
        }
    });
})


module.exports = router;