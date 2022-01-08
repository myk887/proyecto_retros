require('dotenv').config()
const express = require('express')
const {PORT, BASE_URL} = process.env
// const routesUsers = require('./routes/routesUsers')
// const routesArticles = require('./routes/routesArticles')
const {routesArticles, routesUsers} = require('./routes')


const app = express()

app.use(express.json())

app.use('/users', routesUsers)



app.use('/articles', routesArticles)



app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })