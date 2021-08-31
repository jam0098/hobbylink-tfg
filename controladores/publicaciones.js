const Publicacion = require('../modelos/publicacion');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const publicaciones = await Publicacion.find({}).populate('popupText');
    res.render('publicaciones/index', { publicaciones })
}

module.exports.renderNewForm = (req, res) => {
    res.render('publicaciones/new');
}

module.exports.createPublicacion = async (req, res, next) => {
    const publicacion = new Publicacion(req.body.publicacion);
    publicacion.imagenes = req.files.map(f => ({ url: f.path, filename: f.filename }));
    publicacion.autor = req.user._id;
    await publicacion.save();
    console.log(publicacion);
    req.flash('exito', '¡Publicación creada!');
    res.redirect(`/publicaciones/${publicacion._id}`)
}

module.exports.showPublicacion = async (req, res,) => {
    const publicacion = await Publicacion.findById(req.params.id).populate({
        path: 'comentarios',
        populate: {
            path: 'autor'
        }
    }).populate('autor');
    if (!publicacion) {
        req.flash('error', 'Cannot find that publicacion!');
        return res.redirect('/publicaciones');
    }
    res.render('publicaciones/show', { publicacion });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id)
    if (!publicacion) {
        req.flash('error', 'Cannot find that publicacion!');
        return res.redirect('/publicaciones');
    }
    res.render('publicaciones/edit', { publicacion });
}

module.exports.updatePublicacion = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const publicacion = await Publicacion.findByIdAndUpdate(id, { ...req.body.publicacion });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    publicacion.imagenes.push(...imgs);
    await publicacion.save();
    if (req.body.deleteImagenes) {
        for (let filename of req.body.deleteImagenes) {
            await cloudinary.uploader.destroy(filename);
        }
        await publicacion.updateOne({ $pull: { imagenes: { filename: { $in: req.body.deleteImagenes } } } })
    }
    req.flash('exito', '¡Publicación actualizada!');
    res.redirect(`/publicaciones/${publicacion._id}`)
}

module.exports.deletePublicacion = async (req, res) => {
    const { id } = req.params;
    await Publicacion.findByIdAndDelete(id);
    req.flash('exito', '¡Publicación eliminada!')
    res.redirect('/publicaciones');
}