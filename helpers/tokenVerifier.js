const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_PRIVATE_KEY} = process.env


const tokenVerifier = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        const userToken = bearerToken.replace('Bearer ', '')
        const infoToken = jwt.verify(userToken, JWT_PRIVATE_KEY)
        const userId = Number(infoToken.user.id)


        if (!userId || (isNaN(userId))) {
            res.status(401)
            res.end('invalid token')
            return
        }

        req.user = infoToken

        next()

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
}

module.exports = tokenVerifier