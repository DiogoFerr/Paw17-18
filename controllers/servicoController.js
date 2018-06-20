
const { check, validationResult } = require('../node_modules/express-validator/check');

const servico = require("../models/servicoModel");

function setPrioridade(req){
    let prioridade = req.body.paciente_status;
    console.log(prioridade);
}

exports.setPrioridade = setPrioridade;
