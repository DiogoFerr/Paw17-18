const mySqlModule = require('./dbModel');
const data = require('dateformat');

class Servico {
    constructor(dataEntrada, dataSaida, prioridade, descricao, idRegisto, idFuncionario, idTipoServico) {
        this._idServico = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
        this._prioridade = null;
        this._descricao = descricao;
        this._idRegisto = idRegisto;
        this._idFuncionario = idFuncionario;
        this._idTipoServico = idTipoServico;
    }

    get idServico() {
        return this._idServico;
    }

    get dataEntrada() {
        return this._dataEntrada;
    }

    get dataSaida() {
        return this._dataSaida;
    }

    get prioridade() {
        return this._prioridade;
    }

    get descricao() {
        return this._descricao;
    }

    get idRegisto() {
        return this._idRegisto;
    }

    get idFuncionario() {
        return this._idFuncionario;
    }

    get idTipoServico() {
        return this._idTipoServico;
    }
}

module.exports = Servico;

module.exports.adicionarServicoTriagem = (NUS, id, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', " + id + ", 1);");
    mySqlModule.query(sql, callback);
}
