const bcrypt = require('bcrypt')

const passwordVerifier = async ({password, mysqlPassword}) => {
  const result = await bcrypt.compare(password, mysqlPassword)

  return result
}

module.exports = passwordVerifier