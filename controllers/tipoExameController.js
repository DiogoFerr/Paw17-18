const tipoExame = require("../models/tipoExameModel");

function getAllExames(callback) {
    tipoExame.getAllExames(callback);
}

function adicionarTipoExame(req, callback) {
    let nomeExame = req.body.exame;
    tipoExame.adicionarTipoExame(nomeExame, callback);
}

exports.getAllExames = getAllExames;
exports.adicionarTipoExame = adicionarTipoExame;