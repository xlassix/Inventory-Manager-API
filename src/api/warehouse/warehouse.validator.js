import Joi from  "joi"


const schema = Joi.object({
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
export const createWarehouseSchemaValidator= (req, res, next)=> {

    const { error, value } = schema.validate(req.body, options);
    
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}