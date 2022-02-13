// const bcrypt = require('bcrypt')
const connection = require('./../repository/mysqlConnection')
const encryptPassword = require('./../helpers/encryptPassword')
const passwordVerifier = require('./../helpers/passwordVerifier')

const getUsersName = async ({id}) => {

        const user = await connection.query('select username, location, province, id from users where id = ?', [id])
        return user[0]

}

const getUserById = async (idUser) => {

        const users = await  connection.query('select * from users where id = ?', [idUser])
        return users[0]

}



const postUsers = async (user) => {
    let result

        [result] = await connection.query('INSERT INTO users SET ?', {email: user.email, password: user.password, username: user.username, location: user.location, province: user.province ,avatar: user.avatar, active: false, deleted: false, registrationCode: user.registrationCode, recoverCode: null, createdAt: new Date(), modifiedAt: new Date()})

    if (!result.affectedRows) return false

    return {id: result.insertId, username: user.username, email: user.email, location: user.location, province: user.province, avatar: user.avatar}
}

const postLogin = async (user) => {
    const [users] = await  connection.query('select id, active, password from users where email = ?', [user.email])

    const active = users[0] ? users[0].active : null
    const mysqlPassword = users[0] ? users[0].password : null
    const userId = users[0] ? users[0].id : null


    return users[0] ? {mysqlPassword, userId, active} : null
}

const getUserByRegistrationCode = async (code) => {

    const user = await  connection.query('select * from users where registrationCode = ?', [code])
    const findedUser = user[0][0]

    if (!findedUser) return false

    await connection.query('UPDATE users SET active = 1, registrationCode = null WHERE id = ?', [Number(findedUser.id)])

    return true
}

const editUser = async ({user, id}) => {
    let result

      if (user.username) {result = await connection.query('UPDATE users SET username = ? WHERE id = ?', [user.username, id])}

      if (user.email) {result = await connection.query('UPDATE users SET email = ? WHERE id = ?', [user.email, id])}

      if (user.password) {result = await connection.query('UPDATE users SET password = ? WHERE id = ?', [await encryptPassword(user.password), id])}

      if (user.location) {result = await connection.query('UPDATE users SET location = ? WHERE id = ?', [user.location, id])}

      if (user.province) {result = await connection.query('UPDATE users SET province = ? WHERE id = ?', [user.province, id])}

      if (user.avatar) {result = await connection.query('UPDATE users SET avatar = ? WHERE id = ?', [user.avatar, id])}

      return true
}

const editPatch = async ({id, currentPassword, passwordToChange }) => {

    const result = await  connection.query('select password from users where id = ?', [id])

    if (!await passwordVerifier({password: currentPassword, mysqlPassword: result[0][0].password})) return

     const result2 = await connection.query('UPDATE users SET password = ? WHERE id = ?', [ passwordToChange, id])

     if (!result[0].length || result2[0].affectedRows === 0) return

    return true
}

const changePasswordEmail = async ({email,code}) => {

    const recoverPassword = await connection.query('UPDATE users SET recoverCode = ? WHERE email = ?', [code, email])

    if (recoverPassword[0].affectedRows === 0) return

    return true
}

const removeUser = async (userId) => {

    const result = await  connection.query('UPDATE users set deleted = 1 WHERE id = ?', [userId])

    if (result[0].affectedRows === 0) return

    return true
}

const getRecover = async ({email, code, newPassword}) => {
    const changePassword = await connection.query('UPDATE users SET password = ? WHERE recoverCode = ?', [newPassword, code])

    if (changePassword[0].affectedRows === 0) return

    const recoverCodeOfNull = await connection.query('UPDATE users SET recoverCode = NULL WHERE email = ?', [email])

    if (recoverCodeOfNull[0].affectedRows === 0) return

    return true
}

// const postUserAvatar = async ({avatar, id}) => {

//     const result = await connection.query('INSERT INTO users SET avatar = ? WHERE id = ?', {avatar: avatar, id: id})
//     return result[0]

// }

module.exports = {
    getUsersName,
    getUserById,
    postUsers,
    postLogin,
    getUserByRegistrationCode,
    editUser,
    editPatch,
    removeUser,
    getRecover,
    changePasswordEmail
}
