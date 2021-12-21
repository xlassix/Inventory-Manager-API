import config from '../config'
import { User } from '../api/user/user.model'
import jwt from 'jsonwebtoken'
const { permission_maps }= config

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password ) {
    return res.status(400).send({ message: 'email and password required' })
  }
  const user = await User.create(req.body)
  return res.status(201).send({ token: newToken(user) })
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) {
    return res.status(401).send({ message: 'No match found' })
  }
  try {
    if (await user.checkPassword(req.body.password)) {
      return res.status(201).send({ token: newToken(user) })
    }
    return res.status(401).send({ message: 'Invalid Credentials' })
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}

export const protect = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(`Bearer `)
    ) {
      return res.status(401).end()
    }
    const data = await verifyToken(
      req.headers.authorization.split(`Bearer `)[1]
    )
    const user = await User.findById(data.id).select('-password').lean().exec()
    if (user) {
      req.user = user
      next()
    }
  } catch (err) {
    console.log(err.message)
    return res.status(401).end()
  }
}

export const onlyAuthorized = async (req, res, next) => {
  // try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(`Bearer `)
    ) {
      return res.status(401).end()
    }
    const data = await verifyToken(
      req.headers.authorization.split(`Bearer `)[1]
    )
    const user = await User.findById(data.id).select('-password').exec()
    if (user) {
      req.user = user.toJSON()
      var root_path = req.originalUrl.split('/').filter(elem=>elem!=="")[0]
      switch (req.method) {
        case 'DELETE':
        case 'delete': 
          if (req.user.role[permission_maps[root_path]] == 'Admin') {
            return next()
          }
          break
        case 'PUT':
        case 'put':
          if (
            ['Admin', 'Editor'].includes(req.user.role[permission_maps[root_path]])
          ) {
            return next()
          }
          break
        case 'POST':
        case 'post':
          if (
            ['Admin', 'Editor','Creator'].includes(req.user.role[permission_maps[root_path]])
          ) {
            return next()
          }
          break
        case 'GET':
        case 'get':
            if (
              ['Admin', 'Editor','Creator','Viewer'].includes(req.user.role[permission_maps[root_path]])
            ) {
              return next()
            }
            break
        default:
          return res.status(401).end()
      }
      return res.status(401).end()
    }
}
