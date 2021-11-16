import { User, UserRole } from './src/api/User/user.model'
import _ from 'underscore'
import { connect } from './src/util/db'

function toObject(_arr) {
  var output = {}

  for (let i = 0; i < _arr.length; i += 2) {
    output[_arr[i].split("--")[1]] = _arr[i + 1]
  }
  return output
}

const createUser = async()=>  {
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
    elem= elem.split("--")[1]
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
  var {role,...userdata}=data
  await connect()
  try{
  const doc =await User.createWithRole(userdata,role)
  console.log(await doc.populate('role'))
}catch(e){
  console.error(e.message)
}
  process.exit()
}
const initDB = async () => {
  await connect()
  UserRole.count(async (err, count)=>  {
    if (count == 0) {
        console.log("count :", count)
        const doc = await UserRole.create([{
            title:'Admin',
            user: "Admin",
            userRole: 'Admin',
            purchaseOrder: 'Admin',
            warehouse: 'Admin',
        },{
          title:'Anonymous',
          user: "None",
          userRole: 'None',
          purchaseOrder: 'None',
          warehouse: 'None',
      }])
        console.log(docs)
    }
  })
}
initDB()
createUser()