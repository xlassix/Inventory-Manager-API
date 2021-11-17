import mongoose from 'mongoose'

const userRoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true
    },
    user_roles:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    users:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    warehouseid:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    purchase_order:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
  },
  { timestamps: true }
)

export const UserRole = mongoose.model('user_role', userRoleSchema)
