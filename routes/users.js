const express = require("express");
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const Funcionario = require('../models/funcionarioModel');


router.post('/login',
    passport.authenticate('local', { successRedirect: '/admin', failureRedirect: '/' })
);

passport.use(new LocalStrategy(
    function (username, password, done) {
        Funcionario.userExist(username, function (err, result) {
            if (err) { return done(err); }
            if (result[0].total === 0) {
                console.log("Não existe esse utilizador");
                return done(null, false, { message: 'User doesnt exist' });
            } else {
                Funcionario.getUserById(username, function (user, result) {
                    if (result[0].password === password) {
                        return done(null, result);
                    } else {
                        console.log("password errada");
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            }
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