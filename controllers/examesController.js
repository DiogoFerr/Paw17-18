const Exames = require('../Models/examesModel');

function procurarExames(callback){
    Exames.procurarExames(callback);
}

exports.procurarExames = procurarExames;