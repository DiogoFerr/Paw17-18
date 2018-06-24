const tipoExame = require("../models/tipoExameModel");

function getAllExames(callback) {
    tipoExame.getAllExames(callback);
}

function adicionarTipoExame(nomeExame, callback) {
    tipoExame.adicionarTipoExame(nomeExame, callback);
}

exports.getAllExames = getAllExames;
exports.adicionarTipoExame = adicionarTipoExame;