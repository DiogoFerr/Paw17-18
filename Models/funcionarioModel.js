const mySqlModule = require('./dbModel');

class Funcionario {
    constructor(nome, numFuncionario, password, estado, idDepartamento, TipoFuncionario_idTipoFuncionario) {
        this._idFuncionario = null;
        this._nome = nome;
        this._numFuncionario = numFuncionario;
        this._password = password;
        this._estado = 0;
        this._idDepartamento = idDepartamento;
        this._TipoFuncionario_idTipoFuncionario = TipoFuncionario_idTipoFuncionario;
    }

    get idFuncionario() {
        return this._idFuncionario;
    }

    get nome() {
        return this._nome;
    }

    get numFuncionario() {
        return this._numFuncionario;
    }

    get password() {
        return this._password;
    }

    get estado() {
        return this._estado;
    }

    get idDepartamento() {
        return this._idDepartamento;
    }

    get TipoFuncionario_idTipoFuncionario() {
        return this._TipoFuncionario_idTipoFuncionario;
    }


    static inserirFuncionario(funcionario, callback) {

        var sql = ("INSERT INTO funcionario (nome, numFuncionario, password, estado, Departamento_idDepartamento, TipoFuncionario_idTipoFuncionario)"
            + "VALUES ('" + funcionario._nome + "', " + funcionario._numFuncionario + ", '" + funcionario._password + "', " + funcionario._estado + ", " +
            funcionario._idDepartamento + ", " + funcionario._TipoFuncionario_idTipoFuncionario + ")");
        mySqlModule.query(sql, function (err, result) {
            if (err) throw err;
            callback(err);
        });

    }
    static deleteFuncionario(id, callback) {
        var sql = ("DELETE FROM funcionario WHERE idFuncionario =" + id);
        mySqlModule.query(sql, callback);
    }

    static verificaLogIn(funcionario, callback) {
        var sql = ("SELECT password FROM funcionario WHERE numFuncionario =" + funcionario._numFuncionario);
        mySqlModule.query(sql, function (err, result) {
            if (err) throw err;
            callback(err);
        });
        if (result[0] == funcionario._password) {
            return true;
        }
    }
    
    static procurarUtilizadores(callback) {
        var sql = ("SELECT * FROM funcionario WHERE NOT TipoFuncionario_idTipoFuncionario = 1");
        mySqlModule.query(sql, callback);
    }
}

module.exports = Funcionario;

module.exports.userExist = (id, result, callback) => {
    var sql = ("SELECT COUNT(numFuncionario) AS total FROM funcionario WHERE numFuncionario =" + id);
    mySqlModule.query(sql, result, callback);
}

module.exports.getUserById = (id, result, callback) => {
    var sql = ("SELECT * FROM funcionario WHERE numFuncionario =" + id);
    mySqlModule.query(sql, result, callback);
}

module.exports.getUserPassword = (id, callback) => {
    var sql = ("SELECT * FROM funcionario WHERE numFuncionario =" + id);
    mySqlModule.query(sql, callback);
}

/*
module.exports.getUserPassword = (id, callback) => {
    var x = mySqlModule.query("CALL getFuncById(1)", callback);
}
*/

