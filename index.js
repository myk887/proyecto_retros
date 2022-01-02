require('dotenv').config()
const express = require('express')
const {PORT, BASE_URL} = process.env
const { routesUsers, routesArticulos} = require('./routes/routesUsers')

const app = express()

app.use(express.json())

app.post('/users', routesUsers)



app.get('/articles', routesArticulos)



app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })