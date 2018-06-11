class TipoServico{
    constructor(idTipoServico, descricao){
        this._idTipoServico = idTipoServico;
        this._descricao = descricao;
    }

    get idTipoServico(){
        return idTipoServico;
    }

    get descricao(){
        return descricao;
    }
}

module.Exports = TipoServico;