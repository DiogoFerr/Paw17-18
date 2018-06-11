class TipoFuncionario{
    constructor(idTipoFuncionario, descricao){
        this._idTipoFuncionario = idTipoFuncionario;
        this._descricao = descricao;
    }

    get idTipoFuncionario(){
        return idTipoFuncionario();
    }

    get descricao(){
        return descricao;
    }
}

module.Exports = TipoFuncionario;