import mongoose from 'mongoose'
import { User } from './src/api/user/user.model'
import { UserRole } from './src/api/user_role/user_role.model'
import _ from 'underscore'
import { connect } from './src/util/db'

function toObject(_arr) {
  var output = {}

  for (let i = 0; i < _arr.length; i += 2) {
    output[_arr[i].split('--')[1]] = _arr[i + 1]
  }
  return output
}

const createUser = async () => {
  var required_field = [
    '--first_name',
    '--last_name',
    '--phone',
    '--email',
    '--role',
  ]
  var value = process.argv.slice(2)
  if (value.length < 1) {
    console.log(
      'params required \n --firstname: first_name \n -last_name: lastname \n --phone: phone \n -e : email\n --password : password\n -role: role[]'
    )
    process.exit(1)
  }
  var data = toObject(value)
  var errors = required_field.reduce((result, elem) => {
    elem = elem.split('--')[1]
    if (!(elem in data)) {
      result += `${elem} is missing\n`
    }
    if (elem == 'phone') {
      data[elem] = parseInt(data[elem]) || 0
      if (data[elem] == 0) {
        result += `could not parse ${elem} as number\n Note: ${elem} cant be zero\n`
      }
    }
    return result
  }, '')
  if (errors != 0) {
    console.log(errors)
    process.exit()
  }
  var { role, ...userdata } = data
  try {
    const doc = await User.createWithRole(userdata, role)
    console.log(doc.toJSON())
  } catch (e) {
    console.error(e.message)
  }
  process.exit()
}
const initDB = async () => {
  await connect()
  var count = await UserRole.count()
  if (count == 0) {
    console.log('count :', count)
    const docs = await UserRole.create([
      {
        title: 'Admin',
      },
      {
        title: 'Adein4',
      },
      {
        title: 'Admein4',
      },
    ])
    console.log(docs)
  }
  createUser()
}
initDB()
