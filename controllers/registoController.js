const registo = require("../Models/registoModel");

function adicionarRegisto(id, callback) {
    registo.adicionarRegisto(id, callback);
}

function getIdRegistoByNus(nus, callback){
    registo.getIdRegistoByNus(nus, callback);
}

exports.adicionarRegisto = adicionarRegisto;
exports.getIdRegistoByNus = getIdRegistoByNus;