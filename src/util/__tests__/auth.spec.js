import {
  newToken,
  verifyToken,
  signup,
  signin,
  protect,
  onlyAuthorized,
} from '../auth'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { User } from '../../api/user/user.model'
import { UserRole } from '../../api/user_role/user_role.model'

describe('Authentication:', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 123
      const token = newToken({ id })
      const user = jwt.verify(token, config.secrets.jwt)
      expect(user.id).toBe(id)
    })
  })

  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 1234
      const token = jwt.sign({ id }, config.secrets.jwt)
      const user = await verifyToken(token)
      expect(user.id).toBe(id)
    })
  })

  describe('signup', () => {
    test('requires first_name, last_name, email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signup(req, res)
    })

    test('creates user and and sends new token from user', async () => {
      expect.assertions(2)

      const req = {
        body: {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
      }
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id).lean().exec()
          expect(user.email).toBe('hello@hello.com')
        },
      }

      await signup(req, res)
    })
  })

  describe('signin', () => {
    test('requires email and password', async () => {
      expect.assertions(2)

      const req = { body: {} }
      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signin(req, res)
    })

    test('user must be real', async () => {
      expect.assertions(2)

      const req = {
        body: {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signin(req, res)
    })

    test('passwords must match', async () => {
      expect.assertions(2)

      await User.create({
        email: 'hello@hello.com',
        password: '293jssh',
        first_name: 'error',
        last_name: 'hello',
      })

      const req = { body: { email: 'hello@me.com', password: 'wrong' } }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        send(result) {
          expect(typeof result.message).toBe('string')
        },
      }

      await signin(req, res)
    })

    test('creates new token', async () => {
      expect.assertions(2)
      const fields = {
        email: 'hellmo@hello.com',
        password: '293jssh',
        first_name: 'error',
        last_name: 'hello',
      }
      const savedUser = await User.create(fields)

      let { first_name, last_name, ...login_data } = fields
      const req = { body: login_data }
      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        async send(result) {
          let user = await verifyToken(result.token)
          user = await User.findById(user.id).lean().exec()
          expect(user._id.toString()).toBe(savedUser._id.toString())
        },
      }
      await signin(req, res)
    })
  })

  describe('protect', () => {
    test('looks for Bearer token in headers', async () => {
      expect.assertions(2)

      const req = { headers: {} }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('token must have correct prefix', async () => {
      expect.assertions(2)

      let req = { headers: { authorization: newToken({ id: '123sfkj' }) } }
      let res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('must be a real user', async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`
      const req = { headers: { authorization: token } }

      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }

      await protect(req, res)
    })

    test('finds user form token and passes on', async () => {
      const user = await User.create({
        email: 'hello@hello.com',
        password: '293jssh',
        first_name: 'error',
        last_name: 'hello',
      })
      const token = `Bearer ${newToken(user)}`
      const req = { headers: { authorization: token } }

      const next = () => {}
      await protect(req, {}, next)
      expect(req.user._id.toString()).toBe(user._id.toString())
      expect(req.user).not.toHaveProperty('password')
    })
  }),
    describe('onlyAuthorised', () => {
      test('looks for Bearer token in headers', async () => {
        expect.assertions(2)

        const req = { headers: {} }
        const res = {
          status(status) {
            expect(status).toBe(401)
            return this
          },
          end() {
            expect(true).toBe(true)
          },
        }

        await onlyAuthorized(req, res)
      }),
        test('reject wrong Bearer', async () => {
          expect.assertions(2)

          const req = {
            headers: { authorization: newToken({ id: '123sfkj' }) },
          }
          const res = {
            status(status) {
              expect(status).toBe(401)
              return this
            },
            end() {
              expect(true).toBe(true)
            },
          }

          await onlyAuthorized(req, res)
        })

      test('must reject unauthorized user', async () => {
        expect.assertions(2)

        const role = await UserRole.create({ title: 'randomRole' })
        const user = await User.createWithRole(
          {
            email: 'hello@hello.com',
            password: '293jssh',
            first_name: 'error',
            last_name: 'hello',
          },
          'randomRole'
        )
        const req = {
          method: 'GET',
          path :"roles/s",
          headers: { authorization: `Bearer ${newToken(user)}` },
        }
        const res = {
          status(status) {
            expect(status).toBe(401)
            return this
          },
          end() {
            expect(true).toBe(true)
          },
        }

        await onlyAuthorized(req, res)
      }),
    test('Test viewer User- Get', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Viewer" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'GET',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }

      const next = () => {}
      await onlyAuthorized(req, {}, next)
      expect(req.user._id.toString()).toBe(user._id.toString())
      expect(req.user).not.toHaveProperty('password')
    }),
    test('Test viewer User-post', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Viewer" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'POST',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }
      await onlyAuthorized(req, res)
    }),
    test('Test viewer User-Delete', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Viewer" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'DELETE',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }
      await onlyAuthorized(req, res)
    }),
    test('Test Creator User-Delete', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Creator" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'DELETE',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }
      await onlyAuthorized(req, res)
    }),
    test('Test Creator  User- Edit', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Creator" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'PUT',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }
      const res = {
        status(status) {
          expect(status).toBe(401)
          return this
        },
        end() {
          expect(true).toBe(true)
        },
      }
      await onlyAuthorized(req, res)
    }),
    test('Test Admin  User- Edit', async () => {
      expect.assertions(2)

      const role = await UserRole.create({ title: 'randomRole',user:"Admin" })
      const user = await User.createWithRole(
        {
          email: 'hello@hello.com',
          password: '293jssh',
          first_name: 'error',
          last_name: 'hello',
        },
        'randomRole'
      )
      const req = {
        method: 'PUT',
        path :"user",
        headers: { authorization: `Bearer ${newToken(user)}` },
      }

      const next = () => {}
      await onlyAuthorized(req, {}, next)
      expect(req.user._id.toString()).toBe(user._id.toString())
      expect(req.user).not.toHaveProperty('password')
    })
  })
})
