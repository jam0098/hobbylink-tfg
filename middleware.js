const { publicacionSchema, comentarioSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Publicacion = require('./modelos/publicacion');
const Comentario = require('./modelos/comentario');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', '¡Debes haber iniciado sesión antes!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validatePublicacion = (req, res, next) => {
    const { error } = publicacionSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.mensaje).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAutor = async (req, res, next) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    if (!publicacion.autor.equals(req.user._id)) {
        req.flash('error', '¡No tienes permiso para realizar esta acción!');
        return res.redirect(`/publicaciones/${id}`);
    }
    next();
}

module.exports.isComentarioAutor = async (req, res, next) => {
    const { id, comentarioId } = req.params;
    const comentario = await Comentario.findById(comentarioId);
    if (!comentario.autor.equals(req.user._id)) {
        req.flash('error', '¡No tienes permiso para realizar esta acción!');
        return res.redirect(`/publicaciones/${id}`);
    }
    next();
}

module.exports.validateComentario = (req, res, next) => {
    const { error } = comentarioSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.mensaje).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}