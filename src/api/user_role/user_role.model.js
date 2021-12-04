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
    user_role:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    item:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    user:{
      type: String,
      required: true,
      enum: ['None', 'Viewer',"Creator","Editor","Admin"],
      default: 'None',
    },
    warehouse:{
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
