const express = require('express')
const fileUpload = require('express-fileupload')
const crypto = require('crypto')

const app = express()

app.use(fileUpload())

app.use('/uploads', express.static('uploads'))

const codeAvatar = () => {
  return crypto.randomBytes(40).toString('hex')
}

const photoStorage = async (avatar) => {

        await avatar.mv(`./../uploads/${codeAvatar()}.png`)
        return './uploads/avatar.png'
}

module.exports = photoStorage