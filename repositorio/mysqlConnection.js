require('dotenv').config()
const mysql = require('mysql2/promise')
const {HOST, USER1, PASSWORD, DATABASE} = process.env

const connection = mysql.createPool({
  host: HOST,
  user: USER1,
  database: DATABASE,
  password: PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = connection