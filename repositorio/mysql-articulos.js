const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connection = require('./mysqlConnection')

const getTravels = async ({search= '', order= 'place', direction = 'ASC'}) => {
    let orderBy
    switch (order) {
        default:
        case 'place':
            orderBy = 'place'
            break;
        case 'id':
            orderBy = 'id'
            break;
        case 'date':
            orderBy = 'date'
            break;
    }
    let directionTo
    switch (direction.toUpperCase) {
        default:
        case 'ASC':
            directionTo = 'ASC'
            break;
        case 'DESC':
            directionTo = 'DESC'
            break;
    }
        const travels = await connection.query("select * from entries WHERE place like ? order by ? ?", [`%${search}%`, orderBy, directionTo])

        return travels[0]

}

const getTravelsById = async (idEntry) => {
    try {
        const travels =await  connection.query('select * from entries where id = ?', [idEntry])
        return travels[0]
    } catch (error) {
        console.log(error.message)
    }
}

const dateNow = () => {
    const date = new Date()
    const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return newDate
}

const postTravel = async (travel) => {
    const at = dateNow()

        const travels = await connection.query('INSERT INTO entries SET ?', {place: travel.place, description: travel.description, idUser: 1, createdAt: at, modifiedAt: null})
        return travels[0]

}

const closeConnection = () => {
    connection.end()
}

module.exports = {
    getTravels,
    getTravelsById,
    postTravel,
    closeConnection
}