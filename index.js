require('dotenv').config()
const fileUpload = require('express-fileupload')
const express = require('express')
const {PORT, BASE_URL} = process.env
const {routesArticles, routesUsers, routesVotes} = require('./routes')

const app = express()

app.use(fileUpload())

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/users', routesUsers)

app.use('/articles', routesArticles)

app.use('/votes', routesVotes)



app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })