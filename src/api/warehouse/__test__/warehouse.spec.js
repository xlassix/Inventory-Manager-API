import { Warehouse } from '../warehouse.model'
import mongoose from 'mongoose'

describe('Warehouse model', () => {
  describe('WarehouseSchema', () => {
    test('name', () => {
      const name = Warehouse.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true,
      })
    }),
      test('email', () => {
        const email = Warehouse.schema.obj.email
        expect(email).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
          unique: true,
        })
      }),
      test('status', () => {
        const status = Warehouse.schema.obj.status
        expect(status).toEqual({
          type: String,
          required: true,
          enum: ['active', 'inactive'],
          default: 'active',
        })
      }),
      test('phone', () => {
        const phone = Warehouse.schema.obj.phone
        expect(phone).toEqual({
          type: Number,
          required: true,
          unique: true,
        })
      }),
      test('location', () => {
        const location = Warehouse.schema.obj.location
        expect(location).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        })
      })
  })
})
