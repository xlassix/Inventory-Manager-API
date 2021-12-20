import { PurchaseOrder, PurchaseOrderItem } from '../purchase_order.model'
import mongoose from 'mongoose'

describe('Purchase Order model', () => {
  describe('PurchaseOrderSchema', () => {
    test('vendor_name', () => {
      const vendor_name = PurchaseOrder.schema.obj.vendor_name
      expect(vendor_name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      })
    }),
      test('email', () => {
        const email = PurchaseOrder.schema.obj.email
        expect(email).toEqual({
          type: String,
          trim: true,
          maxlength: 50,
          unique: true,
        })
      }),
      test('status', () => {
        const status = PurchaseOrder.schema.obj.status
        expect(status).toEqual({
          type: String,
          required: true,
          enum: ['placed', 'awaiting', 'incomplete', 'complete'],
          default: 'placed',
        })
      }),
      test('vendor_phone', () => {
        const vendor_phone = PurchaseOrder.schema.obj.vendor_phone
        expect(vendor_phone).toEqual({
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
        })
      }),
      test('total_value_delivered', () => {
        const total_value_delivered =
          PurchaseOrder.schema.obj.total_value_delivered
        expect(total_value_delivered).toEqual({
          type: Number,
        })
      }),
      test('total_value_paid', () => {
        const total_value_paid = PurchaseOrder.schema.obj.total_value_paid
        expect(total_value_paid).toEqual({
          type: Number,
        })
      }),
      test('warehouseId', () => {
        const warehouseId = PurchaseOrder.schema.obj.warehouseId
        expect(warehouseId).toEqual({
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'warehouse',
        })
      }),
      test('createdBy', () => {
        const createdBy = PurchaseOrder.schema.obj.createdBy
        expect(createdBy).toEqual({
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user',
        })
      })
  })
})
