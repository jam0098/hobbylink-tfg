const express = require('express');
const router = express.Router();
const publicaciones = require('../controladores/publicaciones');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAutor, validatePublicacion } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Publicacion = require('../modelos/publicacion');

router.route('/')
    .get(catchAsync(publicaciones.index))
    .post(isLoggedIn, upload.array('image'), validatePublicacion, catchAsync(publicaciones.createPublicacion))


router.get('/new', isLoggedIn, publicaciones.renderNewForm)

router.route('/:id')
    .get(catchAsync(publicaciones.showPublicacion))
    .put(isLoggedIn, isAutor, upload.array('image'), validatePublicacion, catchAsync(publicaciones.updatePublicacion))
    .delete(isLoggedIn, isAutor, catchAsync(publicaciones.deletePublicacion));

router.get('/:id/edit', isLoggedIn, isAutor, catchAsync(publicaciones.renderEditForm))



module.exports = router;