import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.statics.createWithRole = async(userdata, role) =>{
  var result= await UserRole.findOne({ title: role }).exec()
  if (!result){
    throw  Error(`${role} does not exist`);
  }
  userdata.role = result._id
  return User.create(userdata)
}

const userRoleSchema = new mongoose.Schema({
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
  user: {
    type: String,
    enum: ['None', 'Viewer', 'Creator', 'Editor', 'Admin'],
    default: 'None',
  },
  purchaseOrder: {
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
