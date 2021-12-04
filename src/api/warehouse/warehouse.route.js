import { Router } from 'express'
import controllers from './warehouse.controller'
import { createWarehouseSchemaValidator } from './warehouse.validator'

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(createWarehouseSchemaValidator, controllers.createOne)
  .all(controllers.rejectRequest)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)
  .all(controllers.rejectRequest)

export default router
