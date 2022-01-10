const express = require('express')
const fileUpload = require('express-fileupload')
const encryptionCreator = require('./encryptionCreator')

const app = express()

app.use(fileUpload())

app.use('/uploads', express.static('uploads'))

const storageAvatarUser = async (avatar) => {

  await avatar.mv(`./../uploads/userAvatarUploads/${encryptionCreator()}.png`)
  return `./uploads/${encryptionCreator()}.png`
}

const storagePhotoArticle = async (photo) => {

  await avatar.mv(`./../uploads/articlePhotoUploads/${encryptionCreator()}.png`)
  return `./uploads/${encryptionCreator()}.png`
}

module.exports = {storageAvatarUser, storagePhotoArticle}