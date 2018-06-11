class Registo{
    constructor(dataEntrada, dataSaida, idPaciente){
        this._idRegisto = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = dataSaida;
        this._idPaciente = idPaciente;
    }

    get idRegisto(){
        return this._idRegisto;
    }

    get dataEntrada(){
        return this._dataEntrada;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get idPaciente(){
        return this._idPaciente;
    }

}

module.Exports = Registo;