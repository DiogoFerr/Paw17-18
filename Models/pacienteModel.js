const mysqlModule = require('./dbModel');

class Paciente {
    constructor(NUS, nome, dataNascimento, genero, rua, concelho, distrito, pais) {
        this._idPaciente = null;
        this._NUS = NUS;
        this._nome = nome;
        this._dataNascimento = dataNascimento;
        this._genero = genero;
        this._rua = rua;
        this._concelho = concelho;
        this._distrito = distrito;
        this._pais = pais;
    }

    get idPaciente() {
        return this._id;
    }

    get NUS() {
        return this._NUS;
    }

    get nome() {
        return this._nome;
    }

    get dataNascimento() {
        return this._dataNascimento;
    }

    get genero() {
        return this._genero;
    }

    get rua() {
        return this._rua;
    }

    get concelho() {
        return this._concelho;
    }

    get distrito() {
        return this._distrito;
    }

    get pais() {
        return this._pais;
    }


    static inserirPaciente(paciente, callback) {
        var sql = ("INSERT INTO paciente (NUS, nome, dataNascimento, genero, rua, concelho, distrito, pais)"
            + "VALUES ('" + paciente._NUS + "', '" + paciente._nome + "', '" + paciente._dataNascimento + "', " + paciente._genero + ", '" +
            paciente._rua + "', '" + paciente._concelho + "', '" + paciente._distrito + "', '" + paciente._pais + "')");
        mysqlModule.query(sql, callback);
    }

    static procurarPacientes(callback) {
        var sql = ("SELECT * FROM paciente");
        mysqlModule.query(sql, callback);
    }
    /*
        static getUserByNUS(NUS,  callback) {
            var sql = ("SELECT * FROM paciente WHERE NUS = " + NUS);
            mysqlModule.query(sql, result, callback);
            console.log("EEEEEEEEEEEEEEEEEEEEEE");
            console.log(result[0].NUS);
        }
        */
}

module.exports = Paciente;

module.exports.getUserByNUS = (NUS, callback) => {
    var sql = ("SELECT * FROM paciente WHERE NUS = " + NUS);
    mysqlModule.query(sql, callback); 
}

module.exports.countUserByNUS = (NUS, result, callback) => {
    var sql = ("SELECT COUNT(idPaciente) AS total FROM paciente WHERE NUS =" + NUS);
    mysqlModule.query(sql, result, callback);

}
