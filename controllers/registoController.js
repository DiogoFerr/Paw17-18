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

exports.adicionarRegisto = adicionarRegisto;
exports.getIdRegistoByNus = getIdRegistoByNus;
exports.verificaExistenciaRegisto = verificaExistenciaRegisto;