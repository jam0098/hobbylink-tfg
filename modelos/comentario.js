const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    body: String,
    rating: Number,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model("Comentario", comentarioSchema);

