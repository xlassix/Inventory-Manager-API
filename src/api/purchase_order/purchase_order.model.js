import mongoose from 'mongoose'
import mg_autopopulate from 'mongoose-autopopulate'
import assert from 'assert'

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
    sku: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
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
purchaseOrderItemSchema.index(
  { purchaseorder_id: 1, item_id: 1 },
  { unique: true }
)

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
      enum: ['placed', 'invoiced', 'incomplete', 'complete', 'cancelled'],
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
    related_items: [purchaseOrderItemSchema],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)
purchaseOrderSchema.plugin(mg_autopopulate)

purchaseOrderSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const data = await this.populate('related_items.item_id')
    this.related_items = this.related_items.map((elem) => {
      elem.purchaseorder_id = data._id
      elem.sku = elem.item_id.sku
      elem.rate_on_request = elem.item_id.cost_price_per_unit
      assert.notEqual(undefined,this.warehouse_id,"Invalid warehouse_id")
      assert.equal(
        this.warehouse_id.toString(),
        elem.item_id.warehouse_id.toString(),
        `item:${elem.sku} doesnt belong to this warehouse`
      )
      elem.item_id = elem.item_id._id
      return elem
    })
  }
  next()
})
purchaseOrderItemSchema.pre('validate', async function (next) {
  if (this.isNew) {
  }
  next()
})

export const PurchaseOrder = mongoose.model(
  'purchase_order',
  purchaseOrderSchema
)
