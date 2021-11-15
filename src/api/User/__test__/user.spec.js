import { User, UserRole } from '../user.model'
import mongoose from 'mongoose'

describe('User model', () => {
  describe('UserSchema', () => {
    test('first_name', () => {
      const first_name = User.schema.obj.first_name
      expect(first_name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      })
    }),
      test('email', () => {
        const email = User.schema.obj.email
        expect(email).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
          unique: true,
        })
      }),
      test('last_name', () => {
        const last_name = User.schema.obj.last_name
        expect(last_name).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
        })
      }),
      test('status', () => {
        const status = User.schema.obj.status
        expect(status).toEqual({
          type: String,
          required: true,
          enum: ['active', 'inactive'],
          default: 'active',
        })
      }),
      test('phone', () => {
        const phone = User.schema.obj.phone
        expect(phone).toEqual({
          type: Number,
          required: true,
          unique: true,
        })
      }),
      test('warehouses', () => {
        const warehouses = User.schema.obj.warehouses
        expect(warehouses).toEqual([
          {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'warehouse',
            unique: true,
          },
        ])
      })
  }),
    describe('UserRoleSchema', () => {
      test('title', () => {
        const title = UserRole.schema.obj.title
        expect(title).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
          unique: true,
          index: true,
        })
      })
    })
})
