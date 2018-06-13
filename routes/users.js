const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Funcionario = require('../models/funcionarioModel');


router.post('/login',
    passport.authenticate('local', { successRedirect: '/novoPaciente', failureRedirect: '/' }),
    (req, res) => {
        console.log("FODASSE");
        res.redirect('/novoPaciente');
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Entrou");
        Funcionario.getUserById(username, function (err, user) {
            console.log(user);
            if (err) return done(err);
            if (!user) {
                console.log("Erro");
                return done(null, false, { message: 'Incorrect username.' });
            }
            Funcionario.getUserPassword(username, function (err, user) {
                console.log(user[0].password);
                if (user[0].password === password) {
                    return done(null, user);
                }
                console.log("password errada");
                return done(null, false, { message: 'Incorrect password.' });
            });
        });
    })
);

module.exports = router;