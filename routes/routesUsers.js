const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginShema = require('./../shemas/loginUsers')
const usersShema = require('./../shemas/users')
const passwordShema = require('./../shemas/passwordShema')
const comprobadorToken = require('./../helpers/comprobadorToken')
const cryptoPassword = require('./../helpers/cryptoPassword')
const generateRegistrationCode = require('./../helpers/generateRegistrationCode')



router.post('/',  async (req, res) => {
    const user = req.body

    try {
        await usersShema.validateAsync(user)
    } catch (error) {
         res.status(404)
         res.end(error.message)
         return
    }
    const codeRegistration = generateRegistrationCode()
    let newUser
    try {
        newUser = await usersRepository.postUsers({
            ...user,
            registrationCode: codeRegistration,
            password: await cryptoPassword(user.password)
        })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!newUser || !user) {
        res.status(404)
        res.end('Users not found')
        return
    }

    accountConfirmationEmail({ sendTo: newUser.email, code: codeRegistration})

    res.status(200)
    res.send(newUser)
})


router.get('/validate/:registrationCode', async (req, res) => {
    const code = req.params.registrationCode

    let result
    try {
        result = await usersRepository.getValidate(code)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!result) {
        res.status(404)
        res.end('invalid registration code')
        return
    }
    res.status(200)
    res.send('ok')
})

router.post('/login', async (req, res) => {
    const user = req.body

    try {
        await loginShema.validateAsync(user)
        } catch (error) {
            res.status(404)
            res.end(error.message)
            return
        }

    let newUser
    try {
        newUser = await usersRepository.postLogin(user)
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }
    if (!newUser) {
        res.status(404)
        res.end('ERROR, verify email')
        return
    }
    if (!newUser.active) {
        res.status(404)
        res.end('ERROR, not verify email')
        return
    }

    if (!await bcrypt.compare(user.password, newUser.password)) {
        res.status(403)
        res.end('Invalid password')
        return
    }

    const token = jwt.sign({
        user: { id: newUser.id }
        }, JWT_PRIVATE_KEY);

        res.status(200)
        res.send({ token })
})


router.put('/:idUser',comprobadorToken, async (req, res) => {
    const infoUser = req.user
    const user = req.body
    const newUser = await usersRepository.editUser(user)

    if (!user || !newUser) {
        res.status(400)
        res.end('You should provide a valid user to save')
    } else {
        res.status(200)
        res.send(newUser)
    }
    })

router.patch('/change/password',comprobadorToken, async (req, res) => {
    const {password} = req.body
    const infoUser = req.user
    const userId = Number(infoUser.id.id)

    try {
        await passwordShema.validateAsync(user)
    } catch (error) {
            res.status(404)
            res.end(error.message)
            return
    }

    if (!userId) {
        res.status(404)
        res.end('User not found/ token not correct')
        return
    }

    let newUser
    try {
            newUser = await usersRepository.editPath({password})
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    if (newUser) {
        res.status(404)
        res.end('user not found')
    }

    res.status(200)
    res.end('Cambios relizados')
    })

router.put('/reset-password') // hacer con envio de email


router.delete('/proflie', comprobadorToken, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)
    let userDelete

    try {
        userDelete = await usersRepository.removeUser(userId)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    if (!userId) {
        res.status(404)
        res.end('User not found')
    }
    if (!userDelete) {
        res.status(404)
        res.end('User not exits')
    }

    res.status(200)
    res.end('user deleted')
    })

router.get('/profile',comprobadorToken, async (req, res) => {
    const infoUser = req.user
    const user = await usersRepository.getUserById(infoUser.id) //JWT
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})




module.exports = router