class ExpressError extends Error {
    constructor(mensaje, codigoError) {
        super();
        this.mensaje = mensaje;
        this.codigoError = codigoError;
    }
}

module.exports = ExpressError;