import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      unique: true,
      required: true,
    },
    warehouse_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'warehouse',
      required: true,
    },
    sku: {
      type: String,
      required: true,
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
      default: 0
    },
    available_stock: {
      type: Number,
      default : 0
    },
    committed_stock: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)
ItemSchema.index({ SKU: 1, warehouseId: 1 }, { unique: true })

ItemSchema.pre('validate', async function (next) {
  if (!this.isModified('sku')) {
    return next()
  }
  var count = await Item.distinct('sku').count()
  this.sku = `SKU-${String(count+1).padStart(5, '0')}`
  next()
})

ItemSchema.pre('update', async function (next) {
  var available_stock = this.getUpdate().$set.available_stock
  if (!available_stock) {
    return next()
  }
  this.getUpdate().$set.status = available_stock>0?"available":"out-of-stock"
  next()
})


export const Item = mongoose.model('item', ItemSchema)