const bcrypt = require('bcrypt')


const encodingBcryptPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
}

module.exports = encodingBcryptPassword
