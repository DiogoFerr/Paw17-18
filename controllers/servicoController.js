const servico = require("../models/servicoModel");

function adicionarServicoTriagem(NUS, id, callback) {
    servico.adicionarServicoTriagem(NUS, id, callback);
}
exports.adicionarServicoTriagem = adicionarServicoTriagem;
