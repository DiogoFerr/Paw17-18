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

    get nome(){
        return this._nome;
    }

    get numFuncionario(){
        return this._numFuncionario;
    }

    get password(){
        return this._password;
    }

    get estado(){
        return this._estado;
    }

    get idDepartamento(){
        return this._idDepartamento;
    }

    get idTipoFuncionario(){
        return this._idTipoFuncionario;
    }
}

module.Exports = Funcionario;
