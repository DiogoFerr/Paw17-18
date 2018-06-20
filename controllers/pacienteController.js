
const { check, validationResult } = require('../node_modules/express-validator/check');

const Paciente = require("../models/pacienteModel");
const date = require('dateformat');

function adicionarPaciente(req, callback) {

    let NUS = req.sanitize(req.body.nus);
    let nome = req.sanitize(req.body.nome);
    let data = req.sanitize(req.body.dataNascimento);
    let dataNascimento = date(data, "isoDate");
    let genero = req.sanitize(req.body.tipo);
    let rua = req.sanitize(req.body.rua);
    let concelho = req.sanitize(req.body.concelho);
    let distrito = req.sanitize(req.body.distrito);
    let pais = req.sanitize(req.body.pais);

    console.log(dataNascimento);
    if (NUS && nome && dataNascimento && genero && genero && rua && concelho && distrito && pais) {
        let novoPaciente = new Paciente(NUS, nome, dataNascimento, genero, rua, concelho, distrito, pais);
        Paciente.inserirPaciente(novoPaciente, (err) => {
            callback(err);
        });
    } else {
        callback(false);
    }
}

function procurarPacientes(callback) {
    Paciente.procurarPacientes(callback);
}

function getUserByNUS(NUS, result, callback) {
    Paciente.getUserByNUS(NUS, result, callback);
}

function countUserByNUS(NUS, result, callback) {
    Paciente.countUserByNUS(NUS, result, callback);
}

exports.countUserByNUS= countUserByNUS;
exports.getUserByNUS = getUserByNUS;
exports.procurarPacientes = procurarPacientes;
exports.adicionarPaciente = adicionarPaciente;
