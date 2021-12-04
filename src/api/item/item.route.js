import { Router } from 'express'
import controllers from './item.controller'
import {createItemSchemaValidator,updateItemSchemaValidator} from "./item.validator"

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(createItemSchemaValidator ,controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(updateItemSchemaValidator, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
