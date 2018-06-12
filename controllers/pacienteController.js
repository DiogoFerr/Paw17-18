
const { check, validationResult } = require('../node_modules/express-validator/check');

const Paciente = require("../models/pacienteModel");

this._NIF = NIF;
this._nome = nome;
this._dataNascimento = dataNascimento;
this._genero = genero;
this._rua = rua;
this._concelho = concelho;
this._distrito = distrito;
this._pais = pais;


function adicionarPaciente(req, callback) {
    let nif = req.sanitize(req.body.nif);
    let nome = req.sanitize(req.body.nome);
    let dataNascimento = req.sanitize(req.body.dataNascimento);
    let genero = req.sanitize(req.body.genero);
    let rua = req.sanitize(req.body.rua);
    let concelho = req.sanitize(req.body.concelho);
    let distrito = req.sanitize(req.body.distrito);
    let pais = req.sanitize(req.body.pais);

    if (nif) {
        let novoFun = new Paciente(nif, nome, dataNascimento, genero, rua, concelho, distrito, pais);
        Paciente.inserirPaciente(novoFun, (err) => {
            callback(err);
        });
    } else {
        callback(false);
    }
}

exports.adicionarPaciente = adicionarPaciente;
