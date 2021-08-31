const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UsuarioSchema = new Schema({

});

UsuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', UsuarioSchema);