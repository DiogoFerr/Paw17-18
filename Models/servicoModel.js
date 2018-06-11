class Servico{
    constructor(dataEntrada, dataSaida, prioridade, descricao, idRegisto, idFuncionario, idTipoServico){
        this._idServico = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = dataSaida;
        this._prioridade = prioridade;
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

module.Exports = Servico;