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

function adicionarServicoInternamento(idRegisto, prioridade, callback) {
    servico.adicionarServicoInternamento(idRegisto, prioridade, callback);
}

function adicionarServicoExamesConsultas(idRegisto, prioridade, callback) {
    servico.adicionarServicoExamesConsultas(idRegisto, prioridade, callback);
}

function terminarServicoExame(req, idFuncionario, idRegisto, callback) {
    let descricao = "Exames: " + req.body.descricao;
    let idExame = req.body.idExame;
    servico.terminarServicoExame(idFuncionario, idRegisto, descricao, idExame, callback);
}

function terminarServicoConsulta(req, idFuncionario, idRegisto, prioridade, callback) {
    let descricao = "Consulta: " + req.body.descricao;
    servico.terminarServicoConsulta(idFuncionario, idRegisto, descricao, prioridade, callback);
}

function setPrioridade(idFuncionario, idRegisto, req, callback) {
    servico.setPrioridade(idFuncionario, idRegisto, req, callback);
}

function buscarDescricao(idRegisto, callback) {
    servico.buscarDescricao(idRegisto, callback);
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

exports.buscarDescricao = buscarDescricao;
exports.terminarServicoConsulta = terminarServicoConsulta;
exports.adicionarServicoExamesConsultas = adicionarServicoExamesConsultas;
exports.terminarServicoExame = terminarServicoExame;
exports.vericarServico = vericarServico;
exports.adicionarServicoTriagem = adicionarServicoTriagem;
exports.adicionarServicoConsultas = adicionarServicoConsultas;
exports.adicionarServicoExamesTriagem = adicionarServicoExamesTriagem;
exports.adicionarServicoInternamento = adicionarServicoInternamento;
exports.setPrioridade = setPrioridade;
exports.setToExames = setToExames;
exports.setTerminado = setTerminado;
exports.getAllServicosOfOneRegisto = getAllServicosOfOneRegisto;