import { Router } from 'express'
import controllers from './warehouse.controller'
import {createWarehouseSchemaValidator} from "./item.validator"

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(createWarehouseSchemaValidator ,controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
