const express = require("express");
const router = express.Router();

const PacienteController = require("../controllers/pacienteController");


router.get('/perfilPaciente', function (req, res) {
    let NUS = req.query.NUS;
    PacienteController.getUserByNUS(NUS, (err, result) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            console.log(result[0]);
            res.render("perfilPaciente", {
                paciente: result[0]
            });
        }
    });
});

module.exports = router;
