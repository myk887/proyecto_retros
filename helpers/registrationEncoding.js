const crypto = require('crypto')

const registrationEncoding = () => {
  return crypto.randomBytes(40).toString('hex')
}



module.exports = registrationEncoding
