const Publicacion = require('../modelos/publicacion');
const Comentario = require('../modelos/comentario');

module.exports.createComentario = async (req, res) => {
    const publicacion = await Publicacion.findById(req.params.id);
    const comentario = new Comentario(req.body.comentario);
    comentario.autor = req.user._id;
    publicacion.comentarios.push(comentario);
    await comentario.save();
    await publicacion.save();
    req.flash('exito', 'Nuevo comentario creado!');
    res.redirect(`/publicaciones/${publicacion._id}`);
}

module.exports.deleteComentario = async (req, res) => {
    const { id, comentarioId } = req.params;
    await Publicacion.findByIdAndUpdate(id, { $pull: { comentarios: comentarioId } });
    await Comentario.findByIdAndDelete(comentarioId);
    req.flash('exito', 'Comentario eliminado')
    res.redirect(`/publicaciones/${id}`);
}
