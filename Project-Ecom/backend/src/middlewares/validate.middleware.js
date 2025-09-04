import CustomError from "../utils/CustomError.util.js"

export const validate = (schema) => {
    return async function (req, res, next) {
        let { error, value } = schema.validate(req.body)
        if (error) {
            return next(new CustomError(error.details[0].message, 400))
            // throw new CustomError(error.details[0].message, 400)
        }
        req.body = value
        next()
    }
}

