const mysqlModule = require('./dbModel');
const date = require('dateformat');

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
}

module.exports = Paciente;

module.exports.procurarPacientesTriagem = (callback) => {
    var sql = ("SELECT paciente.* FROM paciente INNER JOIN registo ON paciente.idPaciente = registo.Paciente_idPaciente INNER JOIN servico ON registo.idRegisto = servico.Registo_idRegisto WHERE TipoServico_idTipoServico = 1 AND servico.dataSaida IS NULL");
    mysqlModule.query(sql, callback);
}

module.exports.procurarPacientesConsultas = (callback) => {
    var sql = ("SELECT paciente.*, servico.prioridade, servico.dataEntrada " +
        "FROM servico " +
        "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
        "INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
        "WHERE servico.TipoServico_idTipoServico = 3 AND servico.dataSaida IS NULL " +
        "ORDER BY " +
        "(CASE " +
        "WHEN (servico.prioridade = 'Vermelho') THEN 1 " +
        "WHEN (servico.prioridade = 'Amarelo') THEN 2 " +
        "WHEN (servico.prioridade = 'Verde') THEN 3 " +
        "END), servico.dataEntrada");
    mysqlModule.query(sql, callback);
}

module.exports.getUserByNUS = (NUS, callback) => {
    var sql = ("SELECT * FROM paciente WHERE NUS = " + NUS);
    mysqlModule.query(sql, callback);
}

module.exports.countUserByNUS = (NUS, result, callback) => {
    var sql = ("SELECT COUNT(idPaciente) AS total FROM paciente WHERE NUS =" + NUS);
    mysqlModule.query(sql, result, callback);

}

module.exports.pacientesAtendidosTriagem = (userid, callback) => {
    var datahoje = new Date();
    datahoje = date(datahoje, "yyyy-mm-dd");
    var sql = ("SELECT paciente.*, servico.dataEntrada, servico.dataSaida, servico.prioridade " +
        "FROM servico " +
        "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
        "INNER JOIN paciente ON registo.Paciente_idPaciente = paciente.idPaciente " +
        "WHERE servico.TipoServico_idTipoServico = 1 AND servico.dataSaida LIKE '%" + datahoje + "%' AND servico.Funcionario_idFuncionario =" + userid);
    mysqlModule.query(sql, callback);
}

module.exports.pacientesAtendidosConsulta = (userid, callback) => {
    var datahoje = new Date();
    datahoje = date(datahoje, "yyyy-mm-dd");
    var sql = ("SELECT paciente.*, servico.dataEntrada, servico.dataSaida, servico.prioridade " +
        "FROM servico " +
        "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
        "INNER JOIN paciente ON registo.Paciente_idPaciente = paciente.idPaciente " +
        "WHERE servico.TipoServico_idTipoServico = 3 AND servico.dataSaida LIKE '%" + datahoje + "%' AND servico.Funcionario_idFuncionario =" + userid);
    mysqlModule.query(sql, callback);
}

module.exports.procurarPacientesExames = (callback) => {
    var sql = ("SELECT paciente.*, servico.prioridade, servico.dataEntrada " +
            "FROM servico " +
            "INNER JOIN registo ON servico.Registo_idRegisto = registo.idRegisto " +
            "INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
            "WHERE (servico.TipoServico_idTipoServico = 2 OR servico.TipoServico_idTipoServico = 4) AND servico.dataSaida IS NULL " +
            "ORDER BY " +
            "(CASE " +
            "WHEN (servico.prioridade = 'Vermelho') THEN 1 " +
            "WHEN (servico.prioridade = 'Amarelo') THEN 2 " +
            "WHEN (servico.prioridade = 'Verde') THEN 3 " +
            "END), servico.dataEntrada");
    mysqlModule.query(sql, callback);
}

module.exports.procurarPacientesRegistoTerminado = (callback) => {
    var sql = ("SELECT paciente.*, registo.dataEntrada, registo.dataSaida " +
    "FROM paciente " +
    "INNER JOIN registo ON paciente.idPaciente = registo.paciente_idpaciente " +
    "WHERE registo.dataEntrada IS NOT NULL AND registo.dataSaida IS NOT NULL");
    mysqlModule.query(sql, callback);
}

module.exports.pacienteByNusRegistoTerminado = (nus, callback) => {
    var sql = ("SELECT * FROM registo INNER JOIN paciente ON registo.paciente_idpaciente = paciente.idPaciente " +
    "WHERE registo.dataEntrada IS NOT NULL AND registo.dataSaida IS NOT NULL AND paciente.NUS = " + nus);
    mysqlModule.query(sql, callback);
}

module.exports.verServicosPaciente = (id, callback) => {
    var sql =("SELECT servico.*, tiposervico.descricao as obs " +
    "FROM servico " + 
    "INNER JOIN tiposervico ON servico.tipoServico_idTipoServico = tiposervico.idTipoServico " +
    "WHERE servico.Registo_idRegisto =" + id);
    mysqlModule.query(sql, callback);
}