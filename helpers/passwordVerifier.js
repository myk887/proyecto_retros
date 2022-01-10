const bcrypt = require('bcrypt')

const passwordVerifier = async ({password, mysqlPassword}) => {
  await bcrypt.compare(password, mysqlPassword)
  return true
}

module.exports = passwordVerifier