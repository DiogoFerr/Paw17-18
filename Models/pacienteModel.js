const mysqlModule = require("./mysqlModule");

class Paciente{
    constructor(idPaciente, nome, dataNascimento, genero, idMorada){
        this._idPaciente = idPaciente;
        this._dataNascimento = dataNascimento;
        this._genero = genero;
        this._idMorada = idMorada;
    }

    get idPaciente(){
        return this._id;
    }

    get dataNascimento(){
        return this._dataNascimento;
    }

    get genero(){
        return this._genero;
    }

    get idMorada(){
        return this._idMorada;
    }
}

module.Exports = Paciente;