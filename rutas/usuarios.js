const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Usuario = require('../modelos/usuario');
const users = require('../controladores/usuarios');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', badRequestMessage : 'Datos incorrectos' }), users.login)

router.get('/logout', users.logout)

module.exports = router;