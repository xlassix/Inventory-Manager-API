import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
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
    phone: {
      type: Number,
      required: true,

      unique: true,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'userRole',
    },
    warehouses: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'warehouse',
        unique: true,
      },
    ],
  },
  { timestamps: true }
)

const userRoleSchema = new mongoose.Schema({
  _id: false,
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    unique: true,
    index: true,
  },
  user: {
    type: String,
    enum: ['None', 'Viewer', 'Creator', 'Editor', 'Admin'],
    default: 'None',
  },
  PurchaseOrder: {
    type: String,
    enum: ['None', 'Viewer', 'Creator', 'Editor', 'Admin'],
    default: 'None',
  },
  warehouse: {
    type: String,
    enum: ['None', 'Viewer', 'Creator', 'Editor', 'Admin'],
    default: 'None',
  },
})

export const User = mongoose.model('user', userSchema)
export const UserRole = mongoose.model('userRole', userRoleSchema)
