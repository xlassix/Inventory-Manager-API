import { Router } from 'express'
import controllers from './user_role.controller'
import { createUserRoleSchemaValidator } from './user_role.validator'

const router = Router()

router
  .route('/')
  .get(controllers.getOne)
  .post(createUserRoleSchemaValidator, controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
