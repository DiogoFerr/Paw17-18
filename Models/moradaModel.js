const mysqlModule = require("./mysqlModule");

class Morada {
    constructor(idMorada, nomeRua, porta, concelho, distrito) {
        this._idMorada = idMorada;
        this._nomeRua = nomeRua;
        this._porta = porta;
        this._concelho = concelho;
        this._distrito = distrito;
    }

    get idMorada() {
        return this._idMorada;
    }

    get nomeRua() {
        return this._nomeRua;
    }

    get porta() {
        return this._porta;
    }

    get concelho() {
        return this._concelho;
    }

    get distrito() {
        return this.distrito;
    }
}

module.exports = Morada;