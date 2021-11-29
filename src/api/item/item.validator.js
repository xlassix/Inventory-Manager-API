import Joi from 'joi'
import AppError from '../../util/error'

const schema = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().uri().required(),
  currency: Joi.string().valid('₦', '$').required(),
  unit: Joi.string().vaild('kg', 'lbs', 'pcs', 'L').required(),
  warehouse_id: Joi.string().required(),
  type: Joi.string().required(),
})
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}
export const createWarehouseSchemaValidator = (req, res, next) => {
  const { error, value } = schema.validate(req.body, options)
  if (error) {
    next(new AppError(error, 406))
  } else {
    req.body = value
    next()
  }
}
