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
      })
    }),
      test('SKU', () => {
        const sku = Item.schema.obj.sku
        expect(sku).toEqual({
          type: String,
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
          enum: ['kg', 'lbs', 'pcs', 'l', 'ml', 'cl'],
          default: 'pcs',
        })
      }),
      test('warehouse_id', () => {
        const warehouseId = Item.schema.obj.warehouse_id
        expect(warehouseId).toEqual({
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'warehouse',
          required: true,
        })
      })
  }),
  describe('Item Model', () => {

    test('Create Item without warehouseId', async() => {
      expect.assertions(2)
      try{    
        await Item.create({
        "name": "Hair cream3",
        "image_url": "https://www.newfoodmagazine.com/wp-content/uploads/food-packaging-1-750x450.jpg",
        "type": "Beauty",
        "currency":"$",
        "unit":"ml",
        "quantity_per_unit":850,
        "cost_price_per_unit":20,
        "selling_price_per_unit":24
      })
    }catch(e){
      expect(e.name).toBe("ValidationError");
      expect(e.message).toContain("item validation failed: warehouse_id: Path `warehouse_id` is required");
    }
  })
  })
})
