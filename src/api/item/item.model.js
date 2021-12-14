import mongoose from 'mongoose'
import mg_autopopulate from 'mongoose-autopopulate'
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    warehouse_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'warehouse',
      required: true,
    },
    sku: {
      type: String,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    type: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    unit: {
      type: String,
      trim: true,
      maxlength: 50,
      enum: ['kg', 'lbs', 'pcs', 'l', 'ml', 'cl'],
      default: 'pcs',
    },
    quantity_per_unit: {
      type: Number,
      required: true,
    },
    cost_price_per_unit: {
      type: Number,
      required: true,
    },
    selling_price_per_unit: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
      maxlength: 5,
      enum: ['₦', '$'],
      default: '₦',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'out-of-stock'],
      default: 'out-of-stock',
    },
    image_url: {
      type: String,
    },
    stock_on_hand: {
      type: Number,
      default: 0,
    },
    available_stock: {
      type: Number,
      default: 0,
    },
    committed_stock: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)
ItemSchema.index({ sku: 1, warehouseId: 1 }, { unique: true })
ItemSchema.plugin(mg_autopopulate)
ItemSchema.pre('save', async function (next) {
  if (this.isNew) {
  const doc = await Item.findOne({ name: this.name,warehouse_id: this.warehouse_id}).populate('warehouse_id').exec()
  if(doc){
    next(new Error(`item : ${this.name} already exit in ${doc.warehouse_id.name}[${doc.warehouse_id.warehouse_id}] warehouse`))
  }
  var count = await Item.distinct('sku').count().exec()
  this.sku = `SKU-${String(count + 1).padStart(5, '0')}`
  }
  next()
})

ItemSchema.pre('update', async function (next) {
  var available_stock = this.getUpdate().$set.available_stock
  if (!available_stock) {
    return next()
  }
  this.getUpdate().$set.status =
    available_stock > 0 ? 'available' : 'out-of-stock'
  next()
})

export const Item = mongoose.model('item', ItemSchema)
