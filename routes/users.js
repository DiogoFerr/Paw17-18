const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Funcionario = require('../models/funcionarioModel');


router.post('/login',
    passport.authenticate('local', { successRedirect: '/novoPaciente', failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/novoPaciente');
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Entrou");
        Funcionario.getUserById(numFunc, function (err, user) {
            console.log(user);
            if (err) return done(err);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            Funcionario.getUserPassword(numFunc, function (err, user) {
                if (user.password === password) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
            });
        });
    })
);

module.exports = router;