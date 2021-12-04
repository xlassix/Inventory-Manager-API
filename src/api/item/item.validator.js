import Joi from 'joi'
import { SchemaValidator } from '../../util/validator'

const schema = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().uri().required(),
  currency: Joi.string().valid('₦', '$').required(),
  unit: Joi.string().valid('kg', 'lbs', 'pcs', "l","ml","cl").required(),
  warehouse_id: Joi.string().required(),
  type: Joi.string().required(),
  quantity_per_unit: Joi.number().required().min(1)
})
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

export const createItemSchemaValidator= SchemaValidator(schema,options)
