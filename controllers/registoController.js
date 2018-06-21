const registo = require("../Models/registoModel");

function adicionarRegisto(id, callback) {
    registo.adicionarRegisto(id, callback);
}

exports.adicionarRegisto = adicionarRegisto;