const mySqlModule = require('./dbModel');
const data = require('dateformat');

class Servico {
    constructor(dataEntrada, dataSaida, prioridade, descricao, idRegisto, idFuncionario, idTipoServico) {
        this._idServico = null;
        this._dataEntrada = dataEntrada;
        this._dataSaida = null;
        this._prioridade = null;
        this._descricao = null;
        this._idRegisto = idRegisto;
        this._idFuncionario = null;
        this._idTipoServico = idTipoServico;
    }

    get idServico() {
        return this._idServico;
    }

    get dataEntrada() {
        return this._dataEntrada;
    }

    get dataSaida() {
        return this._dataSaida;
    }

    get prioridade() {
        return this._prioridade;
    }

    get descricao() {
        return this._descricao;
    }

    get idRegisto() {
        return this._idRegisto;
    }

    get idFuncionario() {
        return this._idFuncionario;
    }

    get idTipoServico() {
        return this._idTipoServico;
    }
}

module.exports = Servico;

module.exports.adicionarServicoTriagem = (id, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', " + id + ", 1);");
    mySqlModule.query(sql, callback);
}


module.exports.adicionarServicoExamesTriagem = (idRegisto, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', " + idRegisto + ", 2);");
    mySqlModule.query(sql, callback);
}

module.exports.adicionarServicoExamesConsultas = (idRegisto, prioridade, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, prioridade, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', '" + prioridade + "', " + idRegisto + ", 4);");
    mySqlModule.query(sql, callback);
}

module.exports.adicionarServicoConsultas = (idRegisto, prioridade, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, prioridade, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', '" + prioridade + "', " + idRegisto + ", 3);");
    mySqlModule.query(sql, callback);
}

module.exports.adicionarServicoInternamento = (idRegisto, prioridade, callback) => {
    var date = new Date();
    var dataEntrada = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("INSERT INTO servico (dataEntrada, prioridade, Registo_idRegisto, TipoServico_idTipoServico) VALUES ('" + dataEntrada + "', '" + prioridade + "', " + idRegisto + ", 6);");
    mySqlModule.query(sql, callback);
}

module.exports.setPrioridade = (idFuncionario, idRegisto, req, callback) => {
    descricao = "Triagem: " + req.body.descricao;
    prioridade = req.body.paciente_status;
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE servico SET dataSaida ='" + dataSaida + "', prioridade='" + prioridade +
        "', descricao='" + descricao + "', Funcionario_idFuncionario =" + idFuncionario +
        " WHERE servico.Registo_idRegisto =" + idRegisto + " AND servico.TipoServico_idTipoServico = 1 AND " +
        "servico.dataSaida IS NULL;")
    mySqlModule.query(sql, callback);
}

// SE NAO TIVER PRIORIDADE È PQ SE ENCONTRA NOS EXAMES SE NAO ESTA NAS CONSULTAS
module.exports.setToExames = (idFuncionario, idRegisto, req, callback) => {
    descricao = "Triagem: " + req.body.descricao;
    prioridade = req.body.paciente_status;
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE servico SET dataSaida ='" + dataSaida +
        "', descricao='" + descricao + "', Funcionario_idFuncionario =" + idFuncionario +
        " WHERE servico.Registo_idRegisto =" + idRegisto + " AND servico.TipoServico_idTipoServico = 1 AND " +
        "servico.dataSaida IS NULL;")
    mySqlModule.query(sql, callback);
}

//SERVE PARA TERMINAR SERVICO APOS A CONSULTA E CONSECUTIVAMENTE O REGISTO (A SER FEITO NO REGISTO MODEL)
module.exports.setTerminado = (idFuncionario, idRegisto, req, callback) => {
    var descricao = req.body.descricao;
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE servico SET dataSaida ='" + dataSaida +
        "', descricao='" + descricao + "', Funcionario_idFuncionario =" + idFuncionario +
        " WHERE servico.Registo_idRegisto =" + idRegisto + " AND servico.TipoServico_idTipoServico = 3 AND " +
        "servico.dataSaida IS NULL;")
    mySqlModule.query(sql, callback);
}

//VAI BUSCAR TODOS OS SERVICOS REALIZADOS NUM REGISTO
module.exports.getAllServicosOfOneRegisto = (idRegisto, callback) => {
    var sql = ("SELECT * FROM servico WHERE servico.Registo_idRegisto =" + idRegisto);
    mySqlModule.query(sql, callback);
}

module.exports.terminarServicoExame = (idFuncionario, idRegisto, descricao, idExame, callback) => {
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE servico SET dataSaida ='" + dataSaida + "', " +
        "descricao='" + descricao + "', Funcionario_idFuncionario=" + idFuncionario + ", tipoExame_idTipoExame=" + idExame + " " +
        "WHERE servico.Registo_idRegisto =" + idRegisto + " AND (servico.TipoServico_idTipoServico = 2 OR servico.TipoServico_idTipoServico = 4) AND " +
        "servico.dataSaida IS NULL");
    mySqlModule.query(sql, callback);
}

module.exports.terminarServicoConsulta = (idFuncionario, idRegisto, descricao, prioridade, callback) => {
    var date = new Date();
    var dataSaida = data(date, 'yyyy-mm-dd HH:MM:ss');
    var sql = ("UPDATE servico " +
        " SET dataSaida='" + dataSaida + "', " +
        " prioridade= '" + prioridade + "', " +
        " descricao='" + descricao + "', Funcionario_idFuncionario = " + idFuncionario +
        " WHERE servico.Registo_idRegisto =" + idRegisto + " AND servico.TipoServico_idTipoServico = 3 AND servico.dataSaida IS NULL");
    mySqlModule.query(sql, callback);
}


module.exports.buscarDescricao = (idRegisto, callback) => {
    var sql = ("SELECT servico.descricao " +
        "FROM servico " +
        "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
        "INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
        "WHERE registo.idRegisto =" + idRegisto + " AND servico.dataSaida IS NOT NULL");
    mySqlModule.query(sql, callback);
}
module.exports.verificarServico = (NUS, callback) => {
    var sql = ("SELECT servico.tipoServico_idTipoServico, servico.prioridade " +
        "FROM servico " +
        "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
        "INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
        "WHERE paciente.NUS =" + NUS + " AND servico.dataSaida IS NULL");
    mySqlModule.query(sql, callback);
}

