import Joi from  "joi"
import { SchemaValidator } from "../../util/validator";

const purchaseItemSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
});
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
export const createWarehouseSchemaValidator= SchemaValidator(purchaseItemSchema,options)