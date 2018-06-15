
const { check, validationResult } = require('../node_modules/express-validator/check');

const Paciente = require("../models/pacienteModel");

function adicionarPaciente(req, callback) {
    let NUS = req.sanitize(req.body.nus);
    let nome = req.sanitize(req.body.nome);
    let dataNascimento = req.sanitize(req.body.dataNascimento);
    let genero = req.sanitize(req.body.tipo);
    let rua = req.sanitize(req.body.rua);
    let concelho = req.sanitize(req.body.concelho);
    let distrito = req.sanitize(req.body.distrito);
    let pais = req.sanitize(req.body.pais);
    console.log("SSSSSSSSSS");

    if (NUS && nome && dataNascimento && genero && genero && rua && concelho && distrito && pais) {
        let novoPaciente = new Paciente(NUS, nome, dataNascimento, genero, rua, concelho, distrito, pais);
            Paciente.inserirPaciente(novoPaciente, (err) => {
            callback(err);
            });
    } else {
        callback(false);
    }
}

exports.adicionarPaciente = adicionarPaciente;
