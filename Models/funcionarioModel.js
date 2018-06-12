const mySqlModule = require('./dbModel');

class Funcionario {
    constructor(nome, numFuncionario, password, estado, idDepartamento, idTipoFuncionario) {
        this._idFuncionario = null;
        this._nome = nome;
        this._numFuncionario = numFuncionario;
        this._password = password;
        this._estado = 0;
        this._idDepartamento = idDepartamento;
        this._idTipoFuncionario = idTipoFuncionario;
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

    get idTipoFuncionario() {
        return this._idTipoFuncionario;
    }


    static inserirFuncionario(funcionario, callback) {
        var sql = ("INSERT INTO funcionario (nome, numFuncionario, password, estado, Departamento_idDepartamento, TipoFuncionario_idTipoFuncionario)"
            + "VALUES ('" + funcionario._nome + "', " + funcionario._numFuncionario + ", '" + funcionario._password + "', " + funcionario._estado + ", " +
            funcionario._idDepartamento + ", " + funcionario._idTipoFuncionario + ")");
        mySqlModule.query(sql, function (err, result) {
            if (err) throw err;
            callback(err);
        });
    }

    static procurarUtilizadores(callback) {
        var sql = ("SELECT * FROM funcionario WHERE NOT TipoFuncionario_idTipoFuncionario = 1");
        mySqlModule.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            callback(err);
        })
    }
}

module.exports = Funcionario;
