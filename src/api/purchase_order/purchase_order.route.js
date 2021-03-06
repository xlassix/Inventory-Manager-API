import { Router } from 'express'
import controllers from './purchase_order.controller'
import {
  createPurchaseOrderSchemaValidator,
  updateStatusPurchaseOrderSchemaValidator,
  invoicePurchaseOrderSchemaValidator,
  deliveryPurchaseOrderSchemaValidator,
  editPurchaseOrderSchemaValidator,
} from './purchase_order.validator'

const router = Router()

router
  .route('/')
  .post(createPurchaseOrderSchemaValidator, controllers.createOne)
  .get(controllers.getMany)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(editPurchaseOrderSchemaValidator, controllers.updateOne)
  .delete(controllers.removeOne)

router
  .route('/:id/status')
  .put(updateStatusPurchaseOrderSchemaValidator, controllers.updateOne)
router
  .route('/:id/invoice')
  .put(invoicePurchaseOrderSchemaValidator, controllers.invoice)
  
export default router
