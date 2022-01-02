const bcrypt = require('bcrypt')


const cryptPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
}

module.exports = {
  cryptPassword
}