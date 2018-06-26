const mySqlModule = require('./dbModel');
class Departamento {
    constructor(nomeDepartamento) {
        this._idDepartamento = null;
        this._nomeDepartamento = nomeDepartamento;
    }

    get idDepartamento() {
        return this._idDepartamento;
    }

    get nomeDepartamento() {
        return this._nomeDepartamento;
    }

    static getDepartamentos(callback) {
        var sql = ("SELECT * FROM departamento");
        mySqlModule.query(sql, callback);
    }

    
}

module.exports = Departamento;

//CONTA NUMERO DE DOENTES ATENDIDOS POR DEPARTAMENTO
module.exports.countNumeroDoentesAtendidosPDepartamento = (idDepartamento, callback) => {
    var sql = ("SELECT count(servico.idServico) AS total FROM servico INNER JOIN funcionario ON servico.funcionario_idFuncionario = funcionario.idFuncionario " + 
    "INNER JOIN departamento ON funcionario.Departamento_idDepartamento = departamento.idDepartamento " +
    "WHERE departamento.idDepartamento =" + idDepartamento);
    mySqlModule.query(sql, callback);
}

module.exports.getDepartamentosDoentes = (callback) => {
    var sql = ("SELECT * from departamento WHERE idDepartamento != 1 AND idDepartamento != 6 AND idDepartamento != 5");
    mySqlModule.query(sql, callback);
}

module.exports.getTotalDoentesAtendidosPDepartamento = (idDepartamento, callback) => {
    var sql = ("SELECT paciente.*, servico.dataEntrada, servico.dataSaida " +
    "FROM servico " +
    "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
    "INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
    "INNER JOIN funcionario ON servico.funcionario_idFuncionario = idFuncionario " +
    "WHERE funcionario.Departamento_idDepartamento =" + idDepartamento);
    mySqlModule.query(sql, callback);
}