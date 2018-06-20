const express = require("express");
const router = express.Router();
const FuncController = require("../controllers/funcionarioController");
const DepartamentoController = require("../controllers/departamentoController");
const TipoFuncController = require("../controllers/tipoFuncionarioController");


function redirectAdmin(res, err) {
    if (err || err === false) {
        res.end("Erro: " + err);
    } else {
        res.redirect("paginaInicialAdmin");
    }
}


router.get('/', function (req, res) {
    FuncController.procurarUtilizadores((err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.render("paginaInicialAdmin", {
                funcionarios: result
            });
        }
    });

});

router.post('/novoFuncionario', function (req, res) {
    FuncController.adicionarFuncionario(req, (err) => {
        redirectAdmin(err);
    });
});

router.get('/novoFuncionario', function (req, res) {
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
        redirectAdmin(res, err);
    })
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
});

router.get('/deleteFuncionario', function (req, res) {
    let id = req.query.id;
    FuncController.deleteFuncionario(id, (err, result) => {
        redirectAdmin(res, err);
    });
})

module.exports = router;