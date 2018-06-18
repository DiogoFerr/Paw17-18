const mySqlModule = require('./dbModel');
class Departamento {
    constructor(nomeDepartamento) {
        this._idDepartamento = null;
        this._nomeDepartamento = nomeDepartamento;
    }

    get idDepartamento() {
        return this._idDepartamento;
    }

    get nomeDepartamento() {
        return this._nomeDepartamento;
    }

    static getDepartamentos(callback) {
        var sql = ("SELECT * FROM departamento");
        mySqlModule.query(sql, callback);
    }

    
}

module.exports = Departamento;