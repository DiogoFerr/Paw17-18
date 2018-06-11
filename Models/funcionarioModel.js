const mysqlModule = require("../node_modules/mysql");

class Funcionario {

    constructor(idFuncionario, nome, numFuncionario, password, estado, idDepartamento, idTipoFuncionario) {
        this._idFuncionario = idFuncionario;
        this._nome = nome;
        this._numFuncionario = numFuncionario;
        this._password = password;
        this._estado = estado;
        this._idDepartamento = idDepartamento;
        this._idTipoFuncionario = idTipoFuncionario;
    }

    get idFuncionario() {
        return idFuncionario;
    }

    get nome(){
        return nome;
    }

    get numFuncionario(){
        return numFuncionario;
    }

    get password(){
        return password;
    }

    get estado(){
        return estado;
    }

    get idDepartamento(){
        return idDepartamento;
    }

    get idTipoFuncionario(){
        return idTipoFuncionario;
    }
}

module.exports = Funcionario;