const Tipos = require("../models/tipoFuncionarioModel");

function getTipos(callback) {
    Tipos.getTipos(callback);
}
exports.getTipos = getTipos;