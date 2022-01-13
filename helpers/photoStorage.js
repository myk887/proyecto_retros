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

// const storagePhotoArticle = async (photo) => {
//   const nameOfPhoto = encryptionCreator()

//   await photo.mv(`./../uploads/articlePhotoUploads/${nameOfPhoto}.png`)
//   return `./uploads/articlePhotoUploads/${nameOfPhoto}.png`
// }

const storagePhotoArticleByCategory = async ({photo, category}) => {
  // AUDIO
  if(category === 'altavoces' || category === 'mp3' || category === 'radios' || category === 'tocadiscos' || category === 'walkman') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/audio/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/audio/${category}/${nameOfPhoto}.png`
  }
  // ELECTRONICA
  if(category === 'cables' || category === 'despertadores' || category === 'gps' || category === 'libros_electronicos' || category === 'maquinas_escribir' || category === 'tdt') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/electronica/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/electronica/${category}/${nameOfPhoto}.png`
  }
  // GAMING
  if(category === 'cartuchos_juegos' || category === 'consolas') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/gaming/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/gaming/${category}/${nameOfPhoto}.png`
  }
  // IMAGEN
  if(category === 'camara_fotos' || category === 'camara_video' || category === 'televisores') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/imagen/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/imagen/${category}/${nameOfPhoto}.png`
  }
  // INFORMATICA
  if(category === 'accesorios' || category === 'monitores' || category === 'ordenadores' || category === 'teclados') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/informatica/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/informatica/${category}/${nameOfPhoto}.png`
  }
  // MUSICA
  if(category === 'cintas' || category === 'vinilos') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/musica/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/musica/${category}/${nameOfPhoto}.png`
  }
  // TELEFONOS
  if(category === 'fijos' || category === 'moviles') {
    const nameOfPhoto = encryptionCreator()

    await photo.mv(`./uploads/articlePhotoUploads/telefonos/${category}/${nameOfPhoto}.png`)
    return `./uploads/articlePhotoUploads/telefonos/${category}/${nameOfPhoto}.png`
  }
}

module.exports = {storageAvatarUser, storagePhotoArticleByCategory}