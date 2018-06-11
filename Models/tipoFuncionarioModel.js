class TipoFuncionario{
    constructor(descricao){
        this._idTipoFuncionario = null;
        this._descricao = descricao;
    }

    get idTipoFuncionario(){
        return this._idTipoFuncionario;
    }

    get descricao(){
        return this._descricao;
    }
}

module.Exports = TipoFuncionario;