const mysqlModule = require('./dbModel');
const data = require('dateformat');

class Registo {
    constructor(dataEntrada, dataSaida, idPaciente) {
        this._idRegisto = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
        this._idPaciente = idPaciente;
    }

    get idRegisto() {
        return this._idRegisto;
    }

    get dataEntrada() {
        return this._dataEntrada;
    }

    get dataSaida() {
        return this._dataSaida;
    }

    get idPaciente() {
        return this._idPaciente;
    }
}

module.exports = Registo;

module.exports.adicionarRegisto = (idPaciente, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO registo (dataEntrada, Paciente_idPaciente) VALUES('" + dataEntrada + "', " + idPaciente + ");");
    mysqlModule.query(sql, callback);
}

// GET id registo por NUS de um paciente em que a data saida seja NULL
module.exports.getIdRegistoByNus = (NUS, callback) => {
    var sql = ("SELECT idRegisto FROM registo INNER JOIN paciente WHERE registo.Paciente_idPaciente = paciente.idPaciente AND paciente.NUS=" + NUS + " AND registo.dataSaida IS NULL");
    mysqlModule.query(sql, callback);
}