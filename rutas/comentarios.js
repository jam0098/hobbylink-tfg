const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateComentario, isLoggedIn, isComentarioAutor } = require('../middleware');
const Publicacion = require('../modelos/publicacion');
const Comentario = require('../modelos/comentario');
const comentarios = require('../controladores/comentarios');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateComentario, catchAsync(comentarios.createComentario))

router.delete('/:comentarioId', isLoggedIn, isComentarioAutor, catchAsync(comentarios.deleteComentario))

module.exports = router;