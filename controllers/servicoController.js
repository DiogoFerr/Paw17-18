const servico = require("../models/servicoModel");

function adicionarServicoTriagem(NUS, callback) {
    servico.adicionarServicoTriagem(NUS, callback);
}
exports.adicionarServicoTriagem = adicionarServicoTriagem;
