const express = require("express");
const router = express.Router();
const passport = require('passport');
const FuncController = require("../controllers/funcionarioController");
const PacienteController = require("../controllers/pacienteController");
const DepartamentoController = require("../controllers/departamentoController");
const TipoFuncController = require("../controllers/tipoFuncionarioController");

function redirectAdmin(err) {
    if (err || err === false) {
        res.end("Erro: " + err);
    } else {
        res.redirect("admin");
    }
}

router.get('/', function (req, res) {
    res.redirect('index');
});

router.get('/index', function (req, res) {
    res.render('index');
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
    let departamentos, tipos;
    DepartamentoController.getDepartamentos((err, result) => {
        if (err || err === false) {
            res.end("Erro:" + err);
        } else {
            departamentos = result;
        }
    });
    TipoFuncController.getTipos((err, result) => {
        if (err || err === false) {
            res.end("Erro:" + err);
        } else {
            tipos = result;
            res.render('novoRegisto', {
                tipos: tipos,
                departamentos: departamentos
            });

        }
    });
});


router.post('/novoRegisto', function (req, res) {
    FuncController.adicionarFuncionario(req, (err) => {
        redirectAdmin(err);
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
            res.redirect("/novoPaciente");
        }
    });
});

router.get('/triagem', function (req, res) {
    PacienteController.procurarPacientes((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("triagem", {
                pacientes: result
            });
        }
    });

});

router.get('/perfilPaciente', function (req, res) {

});

router.get('/editarFuncionario', function (req, res) {
    let id = req.query.id;
    let departamentos, tipos;
    DepartamentoController.getDepartamentos((err, result) => {
        if (err || err === false) {
            res.end("Erro:" + err);
        } else {
            console.log("departamentos");
            departamentos = result;
        }
    });
    TipoFuncController.getTipos((err, result) => {
        if (err || err === false) {
            res.end("Erro:" + err);
        } else {
            console.log("tipos");
            tipos = result;
            res.render('editarFuncionario', {
                id: id,
                tipos: tipos,
                departamentos: departamentos
            });

        }
    });
})



module.exports = router;