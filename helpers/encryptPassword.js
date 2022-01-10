const bcrypt = require('bcrypt')


const encryptPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
}

module.exports = encryptPassword
