import  AppError  from './error'

export const SchemaValidator = (schema,options) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, options)
    if (error) {
      next(new AppError(error, 406))
    } else {
      req.body = value
      next()
    }
  }