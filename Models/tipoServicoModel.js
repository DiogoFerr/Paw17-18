class TipoServico{
    constructor(descricao, sigla){
        this._idTipoServico = null;
        this._descricao = descricao;
        this._sigla = sigla;
    }

    get idTipoServico(){
        return this._idTipoServico;
    }

    get descricao(){
        return this._descricao;
    }
    
    get sigla(){
        return this._sigla;
    }
}

module.Exports = TipoServico;