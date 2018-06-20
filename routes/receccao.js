const express = require("express");
const router = express.Router();

const PacienteController = require("../controllers/pacienteController");

router.get('/', function(req,res){
    res.render('receccao');
})
router.post('/', function (req, res) {
    PacienteController.adicionarPaciente(req, (err) => {
        if (err || err === false) {
            res.end("Erro: " + err);
        } else {
            res.redirect("receccao");
        }
    });
});

module.exports = router;
