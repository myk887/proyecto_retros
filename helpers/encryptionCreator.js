const crypto = require('crypto')

const encryptionCreator = () => {
  return crypto.randomBytes(40).toString('hex')
}


module.exports = encryptionCreator
