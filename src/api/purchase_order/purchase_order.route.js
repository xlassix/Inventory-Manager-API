import { Router } from 'express'
import controllers from './purchase_order.controller'
import { createPurchaseOrderSchemaValidator } from './purchase_order.validator'

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(createPurchaseOrderSchemaValidator, controllers.createOne)
  .all(controllers.rejectRequest)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)
  .all(controllers.rejectRequest)

export default router