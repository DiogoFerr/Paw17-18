const Departamento = require("../models/departamentoModel");

function getDepartamentos(callback) {
    Departamento.getDepartamentos(callback);
}

function countNumeroDoentesAtendidosPDepartamento(idDepartamento, callback){
    Departamento.countNumeroDoentesAtendidosPDepartamento(idDepartamento, callback);
}

function getDepartamentosDoentes(callback){
    Departamento.getDepartamentosDoentes(callback);
}
exports.getDepartamentos = getDepartamentos;
exports.countNumeroDoentesAtendidosPDepartamento = countNumeroDoentesAtendidosPDepartamento;
exports.getDepartamentosDoentes = getDepartamentosDoentes;