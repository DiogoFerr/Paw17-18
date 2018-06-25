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

module.exports.verificaExistenciaRegisto = (NUS, callback) => {
    var sql = ("SELECT COUNT(idRegisto) AS total FROM registo INNER JOIN paciente WHERE registo.Paciente_idPaciente = paciente.idPaciente AND registo.dataSaida IS NULL AND paciente.NUS =" + NUS + ";");
    mysqlModule.query(sql, callback);
}

module.exports.fecharRegisto = (idRegisto, callback) => {
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE registo SET dataSaida ='" + dataSaida + "', estado ='Terminado' " +
        "WHERE idRegisto = " + idRegisto + " AND registo.dataSaida IS NULL")
    mysqlModule.query(sql, callback);
}

//VAI BUSCAR TODOS OS PACIENTES QUE JA TERMINARAM O REGISTO
module.exports.getAllPacientes = (callback) => {
    var sql = ("SELECT paciente.* FROM registo INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente WHERE registo.dataSaida IS NOT NULL");
    mysqlModule.query(sql, callback);
}

//GET TODOS OS REGISTOS TERMINADOS DE UM PACIENTE
module.exports.getAllRegistosOfOnePaciente = (idPaciente, callback) => {
    var sql = ("SELECT * FROM registo WHERE registo.paciente_idpaciente =" + idPaciente + " AND registo.dataSaida IS NOT NULL");
    mysqlModule.query(sql, callback);
}