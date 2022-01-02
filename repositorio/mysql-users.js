const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connection = require('./../repositorio_entris/mysqlConnection')

const getUsers = async () => {
    try {
        const users = await connection.query('select * from users')
        return users[0]
    } catch (error) {
        console.log(error.message)
    }
}

const getUserById = async (idUser) => {
    try {
        const users = await  connection.query('select * from users where id = ?', [idUser])
        return users[0]
    } catch (error) {
        console.log(error.message)
    }
}

const dateNow = () => {
    const date = new Date()
    const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return newDate
}


const postUsers = async (user) => {
    const at = dateNow()
    let users
    try {
        [result] = await connection.query('INSERT INTO users SET ?', {email: user.email, password: user.password, username: user.username, avatar: user.avatar, active: false, deleted: false, role: 'normal', registrationCode: user.registrationCode, recoverCode: null, createdAt: at, modifiedAt: at})
    } catch (error) {
        console.log(error.message)
    }
    if (!result.affectedRows) return false

    return {id: result.insertId, username: user.username, email: user.email, avatar: user.avatar}
}

const postLogin = async (user) => {
    const [users] = await  connection.query('select id, active, password from users where email = ?', [user.email])

    const active = users[0].active
    const mysqlPassword = users[0].password
    const userId = users[0].id

    // if (!active) return

    return {mysqlPassword, userId, active}
}

const getValidate = async (code) => {
    const user = await  connection.query('select * from users where registrationCode = ?', [code])
    const findedUser = user[0][0]

    if (!findedUser) return false

    await connection.query('UPDATE users SET active = 1, registrationCode = null WHERE id = ?', [Number(findedUser.id)])
    // await connection.query('UPDATE users SET registrationCode = null WHERE id = ?', [Number(user[0][0].id)])

    return true
}

module.exports = {
    getUsers,
    getUserById,
    postUsers,
    postLogin,
    getValidate
}


// {
//     "username": "abcp",
//     "email": "zu.kucharova@gmail.com ",
//     "avatar": "htepp//.es",
//     "id": 14
// }

// result = await conection.query('UPDATE users SET username = ? WHERE id = ?', [user.username, user.id])