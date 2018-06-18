const Departamento = require("../models/departamentoModel");

function getDepartamentos(callback) {
    Departamento.getDepartamentos(callback);
}
exports.getDepartamentos = getDepartamentos;