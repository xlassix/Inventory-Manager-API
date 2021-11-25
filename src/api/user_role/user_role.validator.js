import Joi from 'joi'

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

export const createUserRoleSchemaValidator = (req, res, next) => {
  const { error, value } = schema.validate(req.body, options)

  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  } else {
    req.body = value
    next()
  }
}
