const express = require("express");
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const Funcionario = require('../models/funcionarioModel');


router.post('/login',
    passport.authenticate('local', { successRedirect: '/novoPaciente', failureRedirect: '/' })
);

passport.use(new LocalStrategy(
    function (username, password, done) {
        Funcionario.getUserById(username, function (err, user) {
            if (err) return done(err);
            if (!user) {
                console.log("Erro");
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user[0].password === password) {
                return done(null, user);
            }
            console.log("password errada");
            return done(null, false, { message: 'Incorrect password.' });
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log("Serialize:");
    console.log(user);

    done(null, user[0].numFuncionario);
});

passport.deserializeUser(function (id, done) {
    Funcionario.getUserById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = router;