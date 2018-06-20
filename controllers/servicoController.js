
const { check, validationResult } = require('../node_modules/express-validator/check');

const servico = require("../models/servicoModel");

function setPrioridade(req, nus, err){
    let prioridade = req.body.paciente_status;
    console.log(prioridade);
    servico.inserirPaciente(nus, prioridade, (err) => {
        callback(err);
    });
}

exports.setPrioridade = setPrioridade;
