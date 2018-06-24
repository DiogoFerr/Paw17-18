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
    var sql = ("SELECT count(servico.idServico) FROM servico INNER JOIN funcionario ON servico.funcionario_idFuncionario = funcionario.idFuncionario " + 
    "INNER JOIN departamento ON funcionario.Departamento_idDepartamento = departamento.idDepartamento " +
    "WHERE departamento.idDepartamento =" + idDepartamento);
    mySqlModule.query(sql, callback);
}