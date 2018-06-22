const express = require("express");
const router = express.Router();


router.get('/', function (req, res) {
    res.redirect('/login');
});

/*router.get('/index', function (req, res) {
    res.render('index');
});*/

router.get('/login', function (req, res) {
    if (req.user) {
        switch (req.user[0].Departamento_idDepartamento) {
            case 1:
                res.redirect('/admin');
            case 2:
                res.redirect('/consultas');
            case 3:
                res.redirect('/triagem');
            case 4:
                res.redirect('/exames');
            case 5:
                res.redirect('/gestao');
            default:
                res.redirect('/index');
        }
    } else {
        res.render('index');
    }
});
module.exports = router;