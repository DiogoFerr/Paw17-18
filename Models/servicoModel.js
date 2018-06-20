const mySqlModule = require('./dbModel');

class Servico{
    constructor(dataEntrada, dataSaida, prioridade, descricao, idRegisto, idFuncionario, idTipoServico){
        this._idServico = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
        this._prioridade = null;
        this._descricao = descricao;
        this._idRegisto = idRegisto;
        this._idFuncionario = idFuncionario;
        this._idTipoServico = idTipoServico;
    }

    get idServico(){
        return this._idServico;
    }

    get dataEntrada(){
        return this._dataEntrada;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get prioridade(){
        return this._prioridade;
    }

    get descricao(){
        return this._descricao;
    }

    get idRegisto(){
        return this._idRegisto;
    }

    get idFuncionario(){
        return this._idFuncionario;
    }

    get idTipoServico(){
        return this._idTipoServico;
    }
}

module.exports = Servico;

module.exports.criarServico = (idPaciente, dataEntrada, callback) => {
    var sql = ("INSERT INTO servico (dataEntrada, descricao, Registo_idRegisto, Funcionario_idFuncionario, TipoServico_idTipoServico)"); 
    mysqlModule.query(sql, callback);
}
