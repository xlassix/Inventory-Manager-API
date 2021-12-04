import { Item } from '../item.model'
import mongoose from 'mongoose'

describe('Item  model', () => {
  describe('Item Schema', () => {
    test('name', () => {
      const name = Item.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true,
      })
    }),
      test('SKU', () => {
        const sku = Item.schema.obj.sku
        expect(sku).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
          unique: true,
        })
      }),
      test('status', () => {
        const status = Item.schema.obj.status
        expect(status).toEqual({
          type: String,
          required: true,
          enum: ['active', 'out-of-stock'],
          default: 'out-of-stock',
        })
      }),
      test('type', () => {
        const type = Item.schema.obj.type
        expect(type).toEqual({
          type: String,
          trim: true,
          maxlength: 50,
        })
      }),
      test('unit', () => {
        const unit = Item.schema.obj.unit
        expect(unit).toEqual({
          type: String,
          trim: true,
          maxlength: 50,
          enum: ['kg', 'lbs',"pcs","L"],
          default: 'pcs',
        })
      }),
      test('warehouse_id', () => {
        const warehouseId = Item.schema.obj.warehouse_id
        expect(warehouseId).toEqual({
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'warehouse',
          required: true
        })
      })
  })
})
