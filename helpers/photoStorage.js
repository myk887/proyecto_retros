const express = require('express')
const fileUpload = require('express-fileupload')
const encryptionCreator = require('./encryptionCreator')

const app = express()

app.use(fileUpload())

app.use(express.json())

app.use('./../uploads/userAvatarUploads', express.static('uploads'))

const storageAvatarUser = async (avatar) => {
  const nameOfAvatar = encryptionCreator()

      await avatar.mv(`./uploads/userAvatarUploads/${nameOfAvatar}.png`)
      return `./uploads/userAvatarUploads/${nameOfAvatar}.png`
}

const storagePhotoArticle = async (photo) => {
  const nameOfPhoto = encryptionCreator()

  await photo.mv(`./../uploads/articlePhotoUploads/${nameOfPhoto}.png`)
  return `./uploads/articlePhotoUploads/${nameOfPhoto}.png`
}

module.exports = {storageAvatarUser, storagePhotoArticle}