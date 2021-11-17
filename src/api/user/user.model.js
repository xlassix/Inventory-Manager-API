import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { UserRole } from '../user_role/user_role.model'
import mg_autopopulate from 'mongoose-autopopulate'

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
      unique: true,
      sparse: true,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user_role',
      autopopulate: {
        select: '-_id -__v',
      },
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

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

userSchema.plugin(mg_autopopulate)

userSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  delete obj.__v
  return obj
}

userSchema.statics.createWithRole = async (userdata, role) => {
  var result = await UserRole.findOne({ title: role }).exec()
  if (!result) {
    throw Error(`${role} does not exist`)
  }
  userdata.role = result._id
  return User.create(userdata)
}

export const User = mongoose.model('user', userSchema)
