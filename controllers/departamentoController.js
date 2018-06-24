const Departamento = require("../models/departamentoModel");

function getDepartamentos(callback) {
    Departamento.getDepartamentos(callback);
}

function countNumeroDoentesAtendidosPDepartamento(idDepartamento, callback){
    Departamento.countNumeroDoentesAtendidosPDepartamento(idDepartamento, callback);
}
exports.getDepartamentos = getDepartamentos;
exports.countNumeroDoentesAtendidosPDepartamento = countNumeroDoentesAtendidosPDepartamento;