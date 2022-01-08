const crypto = require('crypto')

const generateCrytoCode = () => {
  return crypto.randomBytes(40).toString('hex')
}



module.exports = generateCrytoCode
