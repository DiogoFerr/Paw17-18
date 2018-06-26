
const { check, validationResult } = require('../node_modules/express-validator/check');

const Funcionario = require("../models/funcionarioModel");

var bcrypt = require('bcrypt');
const saltRounds = 10;

function adicionarFuncionario(req, callback) {
    let nome = req.sanitize(req.body.nome);
    let num = req.sanitize(req.body.num);
    let departamento = req.sanitize(req.body.departamento);
    let tipo = req.sanitize(req.body.tipo);
    let pass = req.sanitize(req.body.password);
    let pass2 = req.sanitize(req.body.password2);

    if (nome && num && departamento && tipo && pass == pass2) {
        bcrypt.hash(pass, saltRounds, function (err, hash) {
            let novoFun = new Funcionario(nome, num, hash, 0, departamento, tipo);
            Funcionario.inserirFuncionario(novoFun, (err) => {
                callback(err);
            });
        });

    } else {
        callback(false);
    }
}

function deleteFuncionario(id, callback) {
    Funcionario.deleteFuncionario(id, callback);
}

function editarFuncionario(id, req, callback) {
    let nome = req.sanitize(req.body.nome);
    let departamento = req.sanitize(req.body.departamento);
    let tipo = req.sanitize(req.body.tipo);
    let pass = req.sanitize(req.body.password);
    let pass2 = req.sanitize(req.body.password2);

    if (nome && departamento && tipo && pass == pass2) {
        bcrypt.hash(pass, saltRounds, function (err, hash) {
            Funcionario.updateFuncionario(id, nome, departamento, tipo, hash,  (err) => {
                callback(err);
            });
        });

    } else {
        callback(false);
    }
}

function procurarUtilizadores(callback) {
    Funcionario.procurarUtilizadores(callback);
}

function countDoentesAtendidos(idFuncionario, callback){
    Funcionario.countDoentesAtendidos(idFuncionario, callback);
}

function getAllDoentesFuncionario(idFuncionario, callback){
    Funcionario.getAllDoentesFuncionario(idFuncionario, callback);
}

exports.procurarUtilizadores = procurarUtilizadores;
exports.adicionarFuncionario = adicionarFuncionario;
exports.deleteFuncionario = deleteFuncionario;
exports.editarFuncionario = editarFuncionario;
exports.countDoentesAtendidos = countDoentesAtendidos;
exports.getAllDoentesFuncionario = getAllDoentesFuncionario;