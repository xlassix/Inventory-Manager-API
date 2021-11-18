import mongoose from 'mongoose'
import mg_autopopulate from 'mongoose-autopopulate'

const purchaseOrderSchema = new mongoose.Schema(
  {
    vendor_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    vendor_phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    total_value_requested: {
      type: Double,
      unique: true,
      sparse: true,
    },
    total_value_delivered: {
      type: Double,
      unique: true,
      sparse: true,
    },
    total_value_paid: {
      type: Double,
      unique: true,
      sparse: true,
    },
    warehouseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'warehouse',
    },
    related_item: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'purchase_order_item',
        autopopulate: {
          select: ' -__v',
        },
      },
    ],
    createdBy: {
      type: mongoose.SchemaType.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)
purchaseOrderSchema.plugin(mg_autopopulate)

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    purchase: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'purchase_order',
      required: true,
    },
    itemId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'item',
    },
    SKU: {
      type: String,
      trim: true,
      required: true,
    },
    quantity_order: {
      type: String,
      trim: true,
      required: true,
    },
    quantity_delivered: {
      type: String,
      trim: true,
      required: true,
    },
    price_rate: {
      type: String,
      trim: true,
      required: true,
    },
    price_rate_on_delivery: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

export const PurchaseOrder = mongoose.model(
  'purchase_order',
  purchaseOrderSchema
)
export const PurchaseOrderItem = mongoose.model(
  'purchase_order_item',
  purchaseOrderItemSchema
)
