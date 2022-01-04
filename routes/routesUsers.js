const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginSchema = require('./../schemas/loginSchema')
const usersSchema = require('./../schemas/userSchema')
const passwordSchema = require('./../schemas/passwordSchema')
const tokenVerifier = require('./../helpers/tokenVerifier')
const cryptoPassword = require('./../helpers/cryptoPassword')
const registrationEncoding = require('./../helpers/registrationEncoding')
const { accountConfirmationEmail, accountRecoverCodeEmail } = require('./../notificationEmail/emailSender')



router.post('/',  async (req, res) => {
    const user = req.body

    try {
        await usersSchema.validateAsync(user)
    } catch (error) {
         res.status(404)
         res.end(error.message)
         return
    }
    const codeRegistration = resgistrationEncoding()
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

    accountRecoverCodeEmail({ sendTo: newUser.email, code: codeRegistration})

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
        await loginSchema.validateAsync(user)
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


router.put('/editUser', tokenVerifier, async (req, res) => {
    try {
        const infoUser = req.user
        const user = req.body
        const newUser = await usersRepository.editUser({user, id: infoUser.id})

        if (!user || !newUser) {
            res.status(400)
            res.end('Any change not executed')
        } else {
            res.status(200)
            res.send(newUser)
        }
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }
})

router.patch('/change/password', tokenVerifier, async (req, res) => {
    const {passwordActually, passwordNew} = req.body
    const infoUser = req.user
    const userId = Number(infoUser.id)

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
            newUser = await usersRepository.editPath ({id: userId, passwordActually, passwordNew })
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    if (newUser) {
        res.status(500)
        res.end('not change password')
    }

    res.status(200)
    res.end('Cambio relizado')
    })

router.put('/reset-password', async (req, res) => {
    const {email} = req.body
    const codeRecover = registrationEncoding()

    try {
        const result = await usersRepository.changePasswordEmail({email , code: codeRecover})


    if (!result) {
        res.status(500)
        res.end('not change recoverCode')
    }

    accountConfirmationEmail({ sendTo: email, code: codeRecover})

    res.status(200)
    res.end('Email enviado')

    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    res.status(200)
    res.end('email send')
})

router.get('/recover/:registrationCode', async (req, res) => {
    const code = req.params.registrationCode
    const password = req.body

    let result
    try {
        result = await usersRepository.getRecover({code, password})
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


router.delete('/proflie', tokenVerifier, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)
    let userDelete

    try {
        userDelete = await usersRepository.removeUser(userId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!userId) {
        res.status(404)
        res.end('ERROR, invalid token')
    }
    if (!userDelete) {
        res.status(404)
        res.end('User not exits')
    }

    res.status(200)
    res.end('User deleted')
    })

router.get('/profile', tokenVerifier, async (req, res) => {
    const infoUser = req.user
    const user = await usersRepository.getUserById(infoUser.id) //JWT
    if (!user) {
        res.status(404)
        res.end('User not found')
        return
    }
    res.status(200)
    res.send(user)
})




module.exports = router