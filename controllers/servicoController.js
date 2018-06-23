const servico = require("../models/servicoModel");

function adicionarServicoTriagem(id, callback) {
    servico.adicionarServicoTriagem(id, callback);
}

function setPrioridade(id, idRegisto, req, callback){
    servico.setPrioridade(id, idRegisto, req, callback);
}

exports.adicionarServicoTriagem = adicionarServicoTriagem;
exports.setPrioridade = setPrioridade;