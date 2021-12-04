import Joi from 'joi'
import { SchemaValidator } from '../../util/validator'

const schema = Joi.object({
  title: Joi.string('None', 'Viewer', 'Creator', 'Editor', 'Admin').required(),
  user_role: Joi.string(
    'None',
    'Viewer',
    'Creator',
    'Editor',
    'Admin'
  ).required(),
  user: Joi.string('None', 'Viewer', 'Creator', 'Editor', 'Admin').required(),
  warehouse: Joi.string('None', 'Viewer', 'Creator', 'Editor', 'Admin')
    .email()
    .required(),
})
const options = {
  abortEarly: false,
  allowUnknown: true,
}

export const createUserRoleSchemaValidator = SchemaValidator(schema,options);
