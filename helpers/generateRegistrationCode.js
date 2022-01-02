const crypto = require('crypto')

const generateRegistrationCode = () => {
  return crypto.randomBytes(40).toString('hex')
}



module.exports = {
  generateRegistrationCode
}