import CustomError from '../utils/CustomError.util.js';

const validateRequest = (schema) => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    req.body = value;
    next();
  };
};

export default validateRequest;
