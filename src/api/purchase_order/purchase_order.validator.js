import Joi from  "joi"
import { SchemaValidator } from "../../util/validator";

const purchaseOrderItemSchema = Joi.object({
    item_id: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    rate: Joi.number().min(0),
});
const purchaseOrderSchema = Joi.object({
    items: Joi.array().items(purchaseOrderItemSchema).min(1).required(),
    warehouse_id: Joi.string().required(),
    vendor_phone: Joi.number().required(),
    vendor_name: Joi.string().required(),
    vendor_email: Joi.string(),
});
const chanagePurchaseOrderSchema = Joi.object({
    status: Joi.string().required(),
});
const InvoicePurchaseOrderSchema = Joi.object({
    invoice_id: Joi.string().required(),
    amount: Joi.number().required(),
});
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};
export const createPurchaseOrderSchemaValidator= SchemaValidator(purchaseOrderSchema,options)
export const updateStatusPurchaseOrderSchemaValidator= SchemaValidator(chanagePurchaseOrderSchema,options)
export const invoicePurchaseOrderSchemaValidator= SchemaValidator(InvoicePurchaseOrderSchema,options)