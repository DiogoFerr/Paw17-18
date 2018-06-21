const mySqlModule = require('./dbModel');
const data = require('dateformat');

class Servico{
    constructor(dataEntrada, dataSaida, prioridade, descricao, idRegisto, idFuncionario, idTipoServico){
        this._idServico = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
        this._prioridade = null;
        this._descricao = descricao;
        this._idRegisto = idRegisto;
        this._idFuncionario = idFuncionario;
        this._idTipoServico = idTipoServico;
    }

    get idServico(){
        return this._idServico;
    }

    get dataEntrada(){
        return this._dataEntrada;
    }

    get dataSaida(){
        return this._dataSaida;
    }

    get prioridade(){
        return this._prioridade;
    }

    get descricao(){
        return this._descricao;
    }

    get idRegisto(){
        return this._idRegisto;
    }

    get idFuncionario(){
        return this._idFuncionario;
    }

    get idTipoServico(){
        return this._idTipoServico;
    }
}

module.exports = Servico;

module.exports.adicionarServicoTriagem = (NUS, callback) => {
    var sql = ("SELECT idRegisto FROM registo INNER JOIN paciente WHERE registo.Paciente_idPaciente = paciente.idPaciente AND paciente.NUS=" + NUS + " AND registo.dataSaida IS NULL");
    var id = mysqlModule.query(sql);
    var data = new Date();
    var dataEntrada = data(data, 'YYYY-MM-DD HH:mm:ss');
    var sql2 = ("INSERT INTO servico (dataEntrada, Registo_idRegisto, TipoServico_idTipoServico) VALUES ("+ dataEntrada + ", " + id + ", 1);"); 
    mysqlModule.query(sql2, callback);
}
