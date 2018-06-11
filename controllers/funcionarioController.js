
const { check, validationResult } = require('../node_modules/express-validator/check');

const Funcionario = require("../models/funcionarioModel");

function adicionarFuncionario(req, callback) {
    let nome = req.sanitize(req.body.login.div.form.nome);
    let num = req.sanitize(req.body.login.div.form.num);
    let departamento = req.sanitize(req.body.login.div.form.departamento);
    let tipo = req.sanitize(req.body.login.div.form.tipo);
    let pass = req.sanitize(req.body.login.div.form.password);
    let pass2 = req.sanitize(req.body.login.div.form.password2);
    if (nome && num && departamento && tipo && pass == pass2) {
        let novoFun = new Funcionario(null, nome, num, pass, 0, departamento, tipo);
        Funcionario.inserirFuncionario(novoFun, (err) => {
            callback(err);

        });
    } else {
        callback(false);
    }
}

function iniciarSessao(req, callback) {
    let nome = req.sanitize(req.body.div.form.nome);
    let pass = req - sanitize(req.body.div.form.pass);
    
}

exports.adicionarFuncionario = adicionarFuncionario;