const express = require("express");
const router = express.Router();


router.get('/', function (req, res) {
    res.redirect('/login');
});


router.get('/login', function (req, res) {
    if (req.user) {
        switch (req.user[0].Departamento_idDepartamento) {
            case 1:
                res.redirect('/admin');
                break;
            case 2:
                res.redirect('/consultas');
                break;
            case 3:
                res.redirect('/triagem');
                break;
            case 4:
                res.redirect('/exames');
                break;
            case 5:
                res.redirect('/gestao');
                break;
            case 6:
                res.redirect('/receccao');
                break;
            default:
                res.render('/index');
                break;
        }
    } else {
        res.render('index');
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;