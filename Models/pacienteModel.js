const mysqlModule = require("./mysqlModule");

class Paciente{
    constructor(NIF, nome, dataNascimento, genero, rua, concelho, distrito, pais){
        this._idPaciente = null;
        this._NIF = NIF;
        this._nome = nome;
        this._dataNascimento = dataNascimento;
        this._genero = genero;
        this._rua = rua;
        this._concelho = concelho;
        this._distrito = distrito;
        this._pais = pais;
    }

    get idPaciente(){
        return this._id;
    }

    get NIF(){
        return this._NIF;
    }

    get nome(){
        return this._nome;
    }

    get dataNascimento(){
        return this._dataNascimento;
    }

    get genero(){
        return this._genero;
    }

    get rua(){
        return this._rua;
    }

    get concelho(){
        return this._concelho;
    }

    get distrito(){
        return this._distrito;
    }

    get pais(){
        return this._pais;
    }
}

module.exports = Paciente;