import mongoose from 'mongoose'

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    warehouse_id: {
      type: String,
      required:true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
)

warehouseSchema.pre('validate', async function (next) {
  console.log("ekfs flskfnksdnfs")
  var count = await Warehouse.count()
  this.warehouse_id = `WH-${String(count).padStart(5, '0')}`
  next()
})

export const Warehouse = mongoose.model('warehouse', warehouseSchema)
