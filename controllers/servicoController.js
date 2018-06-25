const servico = require("../models/servicoModel");

function adicionarServicoTriagem(id, callback) {
    servico.adicionarServicoTriagem(id, callback);
}

function adicionarServicoConsultas(idRegisto, prioridade, callback) {
    servico.adicionarServicoConsultas(idRegisto, prioridade, callback);
}

function adicionarServicoExamesTriagem(idRegisto, callback) {
    servico.adicionarServicoExamesTriagem(idRegisto, callback);
}


function terminarServicoExames(req, callback) {
    let descricao = req.body.descricao;
    let idExame = req.body.exame;
    servico.terminarServicoExames(descricao, idExame, callback);
}

function setPrioridade(idFuncionario, idRegisto, req, callback) {
    servico.setPrioridade(idFuncionario, idRegisto, req, callback);
}

function setToExames(idFuncionario, idRegisto, req, callback) {
    servico.setToExames(idFuncionario, idRegisto, req, callback);
}

function setTerminado(idFuncionario, idRegisto, req, callback) {
    servico.setTerminado(idFuncionario, idRegisto, req, callback);
}

function getAllServicosOfOneRegisto(idRegisto, callback) {
    servico.getAllServicosOfOneRegisto(idRegisto, callback);
}

function vericarServico(NUS, callback) {
    servico.verificarServico(NUS, callback);
}

exports.terminarServicoExames = terminarServicoExames;
exports.vericarServico = vericarServico;
exports.adicionarServicoTriagem = adicionarServicoTriagem;
exports.adicionarServicoConsultas = adicionarServicoConsultas;
exports.adicionarServicoExamesTriagem = adicionarServicoExamesTriagem;
exports.setPrioridade = setPrioridade;
exports.setToExames = setToExames;
exports.setTerminado = setTerminado;
exports.getAllServicosOfOneRegisto = getAllServicosOfOneRegisto;