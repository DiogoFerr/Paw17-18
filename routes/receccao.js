const express = require("express");
const router = express.Router();
const empty = require("is-empty");
const PacienteController = require("../controllers/pacienteController");

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
    PacienteController.adicionarPaciente(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.redirect("/receccao");
        }
    });
});

module.exports = router;
