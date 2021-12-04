import Joi from 'joi'
import { SchemaValidator } from '../../util/validator'

const createSchema = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().uri().required(),
  currency: Joi.string().valid('₦', '$').required(),
  unit: Joi.string().valid('kg', 'lbs', 'pcs', "l","ml","cl").required(),
  warehouse_id: Joi.string().required(),
  type: Joi.string().required(),
  quantity_per_unit: Joi.number().required().min(1),
  selling_price_per_unit: Joi.number().required().min(1),
  cost_price_per_unit: Joi.number().required().min(1)
})
const createOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

const updateSchema = Joi.object({
  name: Joi.string(),
  image_url: Joi.string().uri(),
  currency: Joi.string().valid('₦', '$'),
  unit: Joi.string().valid('kg', 'lbs', 'pcs', "l","ml","cl"),
  warehouse_id: Joi.string(),
  type: Joi.string(),
  quantity_per_unit: Joi.number().min(1),
  selling_price_per_unit: Joi.number().min(1),
  cost_price_per_unit: Joi.number().min(1)
})
const updateOptions = {
  abortEarly: true, // include all errors
  allowUnknown: false, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

export const createItemSchemaValidator= SchemaValidator(createSchema,createOptions)
export const updateItemSchemaValidator= SchemaValidator(updateSchema,updateOptions)
