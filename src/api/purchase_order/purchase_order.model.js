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
    purchaseorder_number: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    vendor_email: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ['placed', 'awaiting', 'incomplete', 'complete'],
      default: 'placed',
    },
    total_value_requested: {
      type: Number,
    },
    total_value_delivered: {
      type: Number,
    },
    total_value_paid: {
      type: Number,
    },
    warehouse_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'warehouse',
    },
    related_items: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'purchase_order_item',
        autopopulate: {
          select: ' -__v',
        },
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)
purchaseOrderSchema.plugin(mg_autopopulate)

const purchaseOrderItemSchema = new mongoose.Schema(
  {
    purchaseorder_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'purchase_order',
      required: true,
    },
    item_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'item',
    },
    SKU: {
      type: String,
      trim: true,
      required: true,
    },
    quantity_request: {
      type: Number,
    },
    quantity_delivered: {
      type: Number,
    },
    rate_on_request: {
      type: Number,
    },
    rate_on_delivery: {
      type: Number,
    },
  },
  { timestamps: true }
)
purchaseOrderItemSchema.index({ purchaseorder_id: 1, item_id: 1 }, { unique: true })

export const PurchaseOrder = mongoose.model(
  'purchase_order',
  purchaseOrderSchema
)
export const PurchaseOrderItem = mongoose.model(
  'purchase_order_item',
  purchaseOrderItemSchema
)
