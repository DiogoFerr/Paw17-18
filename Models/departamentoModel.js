class Departamento{
    constructor(nomeDepartamento){
        this._idDepartamento = null;
        this._nomeDepartamento = nomeDepartamento;
    }

    get idDepartamento(){
        return this._idDepartamento;
    }

    get nomeDepartamento(){
        return this._nomeDepartamento;
    }
}

module.exports = Departamento;