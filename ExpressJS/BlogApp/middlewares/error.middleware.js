const error = (err, req, res, next) => {
  //~ deep copy
  let error = { ...err };
  //! global
  error.message = error.message || 'Internal Server error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    object: err,
    stack: error.stack,
  });
};

export default error;
