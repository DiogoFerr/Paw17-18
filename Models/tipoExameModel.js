const mysqlModule = require('./dbModel');

class TipoExame {
    constructor(nomeExame) {
        this._idTipoExame = null;
        this._nomeExame = nomeExame;
    }

    get idTipoExame() {
        return this._idTipoExame;
    }

    get nomeExame() {
        return this._nomeExame;
    }
}

module.exports = TipoExame;

module.exports.adicionarTipoExame = (nomeExame, callback) => {
    var sql = ("INSERT INTO tipoexame (nomeExame) VALUES('" + nomeExame + "');");
    mysqlModule.query(sql, callback);
}

module.exports.getAllExames = (callback) => {
    var sql = ("SELECT * FROM TipoExame");
    mysqlModule.query(sql, callback);
}