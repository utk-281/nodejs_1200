class CustomError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;

//! create a custom error class and define a constructor function which is used to initialize all the variables
//! inside constructor function --> super() is used to call the parent class constructor
//! using extends keyword we are inheriting all the properties and methods from the parent class
//? error is parent class and CustomError is child class
