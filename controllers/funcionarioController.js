
const { check, validationResult } = require('../node_modules/express-validator/check');

const Funcionario = require("../models/funcionarioModel");

function adicionarFuncionario(req, callback) {
    let nome = req.sanitize(req.body.nome);
    let num = req.sanitize(req.body.num);
    let departamento = req.sanitize(req.body.departamento);
    let tipo = req.sanitize(req.body.tipo);
    let pass = req.sanitize(req.body.password);
    let pass2 = req.sanitize(req.body.password2);

    if (nome && num && departamento && tipo && pass == pass2) {
        let novoFun = new Funcionario(nome, num, pass, 0, departamento, tipo);
        Funcionario.inserirFuncionario(novoFun, (err) => {
            callback(err);
        });
    } else {
        callback(false);
    }
}

function iniciarSessao(req, callback) {
    let nome = req.sanitize(req.body.div.form.nome);
    let pass = req.sanitize(req.body.div.form.pass);
}

function deleteFuncionario(id, callback) {
    Funcionario.deleteFuncionario(id, callback);
}


function procurarUtilizadores(callback) {
    Funcionario.procurarUtilizadores(callback);

}
exports.procurarUtilizadores = procurarUtilizadores;
exports.adicionarFuncionario = adicionarFuncionario;
exports.deleteFuncionario = deleteFuncionario;