const registo = require("../Models/registoModel");

function adicionarRegisto(id, callback) {
    registo.adicionarRegisto(id, callback);
}

function getIdRegistoByNus(nus, callback){
    registo.getIdRegistoByNus(nus, callback);
}

function verificaExistenciaRegisto(nus, callback){
    registo.verificaExistenciaRegisto(nus, callback);
}

function fecharRegisto(idRegisto, callback){
    registo.fecharRegisto(idRegisto, callback);
}

function getAllPacientes(callback){
    registo.getAllPacientes(callback);
}

function getAllRegistosOfOnePaciente(idPaciente, callback){
    registo.getAllRegistosOfOnePaciente(idPaciente, callback);
}

exports.adicionarRegisto = adicionarRegisto;
exports.getIdRegistoByNus = getIdRegistoByNus;
exports.verificaExistenciaRegisto = verificaExistenciaRegisto;
exports.fecharRegisto = fecharRegisto;
exports.getAllPacientes = getAllPacientes;
exports.getAllRegistosOfOnePaciente = getAllRegistosOfOnePaciente;