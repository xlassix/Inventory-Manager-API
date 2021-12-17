import { Router } from 'express'
import controllers from './purchase_order.controller'
import { createPurchaseOrderSchemaValidator } from './purchase_order.validator'

const router = Router()

router
  .route('/')
  .post(createPurchaseOrderSchemaValidator,controllers.createOne)

// router
//   .route('/:id')
//   .get(controllers.getOne)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne)
//   .all(controllers.rejectRequest)

export default router