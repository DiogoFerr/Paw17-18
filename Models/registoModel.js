const mysqlModule = require('./dbModel');

class Registo{
    constructor(dataEntrada, dataSaida, idPaciente){
        this._idRegisto = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
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

module.exports = Registo;

module.exports.criarRegisto = (idPaciente, dataEntrada, callback) => {
    var sql = ("INSERT INTO paciente (dataEntrada, Paciente_idPaciente) VALUES(" + dataEntrada, idPaciente + ");"); 
    mysqlModule.query(sql, callback);
}