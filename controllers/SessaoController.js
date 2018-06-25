function isAuth(req, res, callback) {
    if (req.user) {
        console.log(req.user[0].Departamento_idDepartamento);
        switch (req.user[0].Departamento_idDepartamento) {
            case 1:
                res.redirect('/admin');
                callback;
            case 2:
                res.redirect('/consultas');
                callback;
            case 3:
                res.redirect('/triagem');
                callback;
            case 4:
                res.redirect('/exames');
                callback;
            case 5:
                res.redirect('/gestao');
                callback;
            case 6:
                res.redirect('/receccao');
                callback;
            default:
                res.render('/index');
                callback;
        }
    } else {
        res.render('index');
    }

}

exports.isAuth = isAuth;