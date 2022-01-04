const jwt = require('jsonwebtoken')


const tokenVerifier = (req, res, next) => {
    try {
        const userToken = req.headers.authorization
        const infoToken = jwt.verify(userToken, JWT_PRIVATE_KEY)
        const userId = Number(infoToken.id)

        if (!userId || (isNaN(userId))) {
            res.status(400)
            res.end('invalid token code')
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