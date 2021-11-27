import { Warehouse } from '../warehouse.model'
import router from '../warehouse.route'
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
      test('address', () => {
        const address = Warehouse.schema.obj.address
        expect(address).toEqual({
          type: String,
          required: true,
          trim: true,
        })
      })
  }),
  describe('Warehouse router', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' }
    ]
    routes.forEach(route => {
    test(`has path ${route.path}, Method: ${route.method}`, () => {  
        const match = router.stack.find(
          s => s.route.path === route.path && s.route.methods[route.method]
        )
        expect(match).toBeTruthy()
      })
    })
  })
})
