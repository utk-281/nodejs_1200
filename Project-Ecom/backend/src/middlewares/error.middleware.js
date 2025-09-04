const error = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message || 'Internal Server Error'
    error.statusCode = err.statusCode || 500

    if (err.code === 11000) {
        let field = Object.keys(error.keyValue)[0];
        error.message = `${field} already exists`
        error.statusCode = 409
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errObject: err,
        errLine: err.stack,
    })
}

export default error