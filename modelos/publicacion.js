const mongoose = require('mongoose');
const Comentario = require('./comentario')
const Schema = mongoose.Schema;


// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/Hobbylink/gxgle1ovzd2f3dgcpass.png

const ImagenSchema = new Schema({
    url: String,
    filename: String
});

ImagenSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const PublicacionSchema = new Schema({
    titulo: String,
    imagenes: [ImagenSchema],
    descripcion: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    comentarios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comentario'
        }
    ]
}, opts);


PublicacionSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/publicaciones/${this._id}">${this.titulo}</a><strong>
    <p>${this.descripcion.substring(0, 20)}...</p>`
});



PublicacionSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comentario.deleteMany({
            _id: {
                $in: doc.comentarios
            }
        })
    }
})

module.exports = mongoose.model('Publicacion', PublicacionSchema);