//! 1) install expressAsyncHandler --> which will automatically catch the errors, no need to use try catch. wrap the async function inside the expressAsyncHandler

//! 2) create a error handler middleware, handle all the errors

//! 3) invoke it in the main file (server.js)

const error = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }

  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = "email already exists";
  }

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "please provide a valid id";
  }

  //! global error handler
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errObj: err,
  });
};

module.exports = { error };

err = {
  errors: {
    email: {
      name: "ValidatorError",
      message: "Path `email` is required.",
      properties: {
        message: "Path `email` is required.",
        type: "required",
        path: "email",
      },
      kind: "required",
      path: "email",
    },
  },
  _message: "User validation failed",
  statusCode: 500,
  name: "ValidationError",
  message: "User validation failed: email: Path `email` is required.",
};
