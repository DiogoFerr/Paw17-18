
const { check, validationResult } = require('../node_modules/express-validator/check');

const Paciente = require("../models/pacienteModel");
const date = require('dateformat');
function validatePaciente(req, callback) {

    req.check('NUS', 'O NUS tem de ser numerico e com 9 numeros!').isInt().len(9);
    req.check('nome', 'O nome é invalido!').matches(/^[a-z ]+$/i).len(3, 45);
    req.check('tipo', 'O tipo é invalido').isInt({ min: 1, max: 2 });
    req.check('rua', 'A rua é invalida!').matches(/^[a-z0-9 ]+$/i).len(3, 45);
    req.check('concelho', 'O concelho é invalido!').matches(/^[a-z ]+$/i).len(3, 45);
    req.check('distrito', 'O distrito é invalido!').matches(/^[a-z ]+$/i).len(3, 45);
    req.check('pais', 'O pais é invalido!').matches(/^[a-z ]+$/i).len(3, 45);
    var errors = req.validationErrors();
    callback(errors);
}
function adicionarPaciente(req, callback) {
    let NUS = req.sanitize(req.body.NUS);
    let nome = req.sanitize(req.body.nome);
    let data = req.sanitize(req.body.dataNascimento);
    let dataNascimento = date(data, "isoDate");
    let genero = req.sanitize(req.body.tipo);
    let rua = req.sanitize(req.body.rua);
    let concelho = req.sanitize(req.body.concelho);
    let distrito = req.sanitize(req.body.distrito);
    let pais = req.sanitize(req.body.pais);
    if (NUS && nome && dataNascimento && genero && genero && rua && concelho && distrito && pais) {
        let novoPaciente = new Paciente(NUS, nome, dataNascimento, genero, rua, concelho, distrito, pais);
        Paciente.inserirPaciente(novoPaciente, (err) => {
            callback(err);
        });
    } else {
        callback(false);
    }
}

function procurarPacientesTriagem(callback) {
    Paciente.procurarPacientesTriagem(callback);
}

function procurarPacientesExames(callback) {
    Paciente.procurarPacientesExames(callback);
}

function procurarPacientesConsultas(callback) {
    Paciente.procurarPacientesConsultas(callback);
}

function getUserByNUS(NUS, callback) {
    Paciente.getUserByNUS(NUS, callback);
}

function countUserByNUS(NUS, callback) {
    Paciente.countUserByNUS(NUS, callback);
}

function pacientesAtentididosTriagem(userid, callback) {
    Paciente.pacientesAtendidosTriagem(userid, callback);
}

function pacientesAtentididosConsulta(userid, callback) {
    Paciente.pacientesAtendidosConsulta(userid, callback);
}

function pacientesAtendidosExame(userid, callback) {
    Paciente.pacientesAtendidosExame(userid, callback);
}

function procurarPacientesRegistoTerminado(callback) {
    Paciente.procurarPacientesRegistoTerminado(callback);
}

function pacienteByNusRegistoTerminado(nus, callback){
    Paciente.pacienteByNusRegistoTerminado(nus, callback);
}

function verServicosPaciente(id, callback){
    Paciente.verServicosPaciente(id, callback);
}

exports.validatePaciente = validatePaciente;
exports.pacientesAtendidosConsulta = pacientesAtentididosConsulta;
exports.pacientesAtendidosTriagem = pacientesAtentididosTriagem;
exports.countUserByNUS = countUserByNUS;
exports.getUserByNUS = getUserByNUS;
exports.procurarPacientesTriagem = procurarPacientesTriagem;
exports.procurarPacientesConsultas = procurarPacientesConsultas;
exports.adicionarPaciente = adicionarPaciente;
exports.procurarPacientesExames = procurarPacientesExames;
exports.procurarPacientesRegistoTerminado = procurarPacientesRegistoTerminado;
exports.pacienteByNusRegistoTerminado = pacienteByNusRegistoTerminado;
exports.verServicosPaciente = verServicosPaciente;
exports.pacientesAtendidosExame = pacientesAtendidosExame;