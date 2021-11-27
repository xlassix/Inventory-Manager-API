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
    warehouseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'warehouseId',
      required: true,
    },
    SKU: {
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
  },
  { timestamps: true }
)
ItemSchema.index({ SKU: 1, warehouseId: 1 }, { unique: true })

export const Item = mongoose.model('item', ItemSchema)
