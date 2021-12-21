import Joi from 'joi'
import { SchemaValidator } from '../../util/validator'

const purchaseOrderItemSchema = Joi.object({
  item_id: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  rate: Joi.number().min(0),
})
const purchaseOrderSchema = Joi.object({
  items: Joi.array().items(purchaseOrderItemSchema).min(1).required(),
  warehouse_id: Joi.string().required(),
  vendor_phone: Joi.number().required(),
  vendor_name: Joi.string().required(),
  vendor_email: Joi.string(),
})

const editPurchaseOrderItemSchema = Joi.object({
  id:Joi.string().required(),
  quantity: Joi.number().min(0),
  rate: Joi.number().min(0),
})

const editPurchaseOrderSchema = Joi.object({
  vendor_phone: Joi.number(),
  vendor_email: Joi.string(),
  items: Joi.array().items(editPurchaseOrderItemSchema).min(1)
})

const deliveryPurchaseOrderSchema = Joi.object({
  items: Joi.array().items(purchaseOrderItemSchema).min(1).required(),
})

const chanagePurchaseOrderSchema = Joi.object({
  status: Joi.string().required(),
})
const InvoicePurchaseOrderSchema = Joi.object({
  invoice_id: Joi.string().required(),
  amount: Joi.number().required(),
})
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}
export const createPurchaseOrderSchemaValidator = SchemaValidator(
  purchaseOrderSchema,
  options
)
export const updateStatusPurchaseOrderSchemaValidator = SchemaValidator(
  chanagePurchaseOrderSchema,
  options
)
export const invoicePurchaseOrderSchemaValidator = SchemaValidator(
  InvoicePurchaseOrderSchema,
  options
)
export const editPurchaseOrderSchemaValidator = SchemaValidator(
  editPurchaseOrderSchema,
  options
)

export const deliveryPurchaseOrderSchemaValidator = SchemaValidator(
  deliveryPurchaseOrderSchema,
  options
)
