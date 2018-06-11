class Departamento{
    constructor(idDepartamento, nomeDepartamento){
        this._idDepartamento = idDepartamento;
        this._nomeDepartamento = nomeDepartamento;
    }

    get idDepartamento(){
        return idDepartamento;
    }

    get nomeDepartamento(){
        return nomeDepartamento;
    }
}

module.Exports = Departamento;