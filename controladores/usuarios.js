const Usuario = require('../modelos/usuario');

module.exports.renderRegister = (req, res) => {
    res.render('usuarios/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, contraseña } = req.body;
        const usuario = new Usuario({username});
        const registeredUsuario = await Usuario.register(usuario, contraseña);
        req.login(registeredUsuario, err => {
            if (err) return next(err);
            req.flash('exito', '¡Bienvenido a Hobby Link!');
            res.redirect('/publicaciones');
        })
    } catch (e) {
        req.flash('error', e.mensaje);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('usuarios/login');
}

module.exports.login = (req, res) => {
    req.flash('exito', '¡Bienvenido de vuelta!');
    const redirectUrl = req.session.returnTo || '/publicaciones';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('exito', "¡Adiós!");
    res.redirect('/publicaciones');
}