const express = require("express");
const router = express.Router();
const FuncController = require("../Controllers/funcionarioController");

router.get('/', function (req, res) {
    res.redirect('/index');
});
router.get('/index', function (req, res) {
    res.render('index');
});
router.get('/admin', function (req, res) {
    res.render('admin');
});
router.get('/novoRegisto', function (req, res) {
    res.render('novoRegisto');
});


module.exports = router;