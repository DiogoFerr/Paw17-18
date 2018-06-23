const express = require("express");
const router = express.Router();
const FuncController = require("../controllers/funcionarioController");
const DepartamentoController = require("../controllers/departamentoController");
const TipoFuncController = require("../controllers/tipoFuncionarioController");

function isAuth(){
    if(req.user){
        if(req.user[0].Departamento_idDepartamento === 1){
            res.redirect('/');
        }else{
            //MANDA PARA A PAGINA DO DEPARTAMENTO DELE
        }
    }else{
        res.redirect('/login');
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
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.redirect("/admin");
        }
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
        if (err || err === false) {
            res.end("Erro: " + err);
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
            res.end("Erro: " + err);
        } else {
            res.redirect("/admin");
        }
    });
})

module.exports = router;