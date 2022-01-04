const bcrypt = require('bcrypt')


const bcryptPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
}

module.exports = bcryptPassword
