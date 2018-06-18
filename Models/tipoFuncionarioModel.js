const mySqlModule = require('./dbModel');
class TipoFuncionario {
    constructor(descricao) {
        this._idTipoFuncionario = null;
        this._descricao = descricao;
    }

    get idTipoFuncionario() {
        return this._idTipoFuncionario;
    }

    get descricao() {
        return this._descricao;
    }

    static getTipos(callback) {
        var sql = ("SELECT * FROM tipofuncionario");
        mySqlModule.query(sql, callback);
    }
}
module.exports = TipoFuncionario;