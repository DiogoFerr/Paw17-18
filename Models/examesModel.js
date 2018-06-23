const mySqlModule = require('./dbModel');

class Exame {
    constructor(descricao) {
        this._idExame = null;
        this._descricao = descricao;
    }


    get idExame() {
        return this._idExame;
    }

    get descricao() {
        return this._descricao;
    }
    static procurarExames(callback) {
        var sql = ("SELECT * FROM exames")
        mySqlModule.query(sql, callback);
    }
}

module.exports.Exame;
