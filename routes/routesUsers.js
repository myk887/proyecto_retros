const express = require('express')
require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepository = require('./../repositorio/mysql-users')
const loginSchema = require('./../schemas/loginUsers')
const usersSchema = require('./../schemas/users')
const passwordSchema = require('./../schemas/passwordSchema')
const tokenVerifier = require('./../helpers/tokenVerifier')
const encodingBcryptPassword = require('../helpers/encodingBcryptPassword')
const generateCrytoCode = require('../helpers/generateCrytoCode')
const { accountConfirmationEmail, accountRecoverCodeEmail } = require('./../notificationEmail/emailSender')

const app = express()
app.use(express.json())

const { JWT_PRIVATE_KEY} = process.env

router.post('/',  async (req, res) => {
    const user = req.body

    try {
        await usersSchema.validateAsync(user)
    } catch (error) {
         res.status(404)
         res.end(error.message)
         return
    }
    const codeRegistration = generateCrytoCode()
    let newUser
    try {
        newUser = await usersRepository.postUsers({
            ...user,
            registrationCode: codeRegistration,
            password: await encodingBcryptPassword(user.password)
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
    try {
         await accountRecoverCodeEmail({ sendTo: newUser.email, code: codeRegistration})

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

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
    try {
        if (!await bcrypt.compare(user.password, newUser.mysqlPassword)) {
            res.status(403)
            res.end('Invalid password')
            return
            }
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }


    const token = jwt.sign({
        user: { id: newUser.userId }
        }, JWT_PRIVATE_KEY)

        res.status(200)
        res.send({ token })
})


router.put('/editUser',tokenVerifier, async (req, res) => {
    try {
        const infoUser = req.user.user
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

router.patch('/change/password',tokenVerifier, async (req, res) => {
    const {passwordActually, passwordNew} = req.body
    const infoUser = req.user.user
    const userId = Number(infoUser.id)
    const passwordToChange = await encodingBcryptPassword(passwordNew)

    try {
        await passwordSchema.validateAsync({password: passwordNew})
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
            newUser = await usersRepository.editPath ({id: userId, passwordActually, passwordToChange })
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    if (!newUser) {
        res.status(500)
        res.end('not change password')
    }

    res.status(200)
    res.end('Cambio relizado')
    })

router.put('/reset-password', async (req, res) => {
    const {email} = req.body
    const codeRecover = generateCrytoCode()

    try {
        const result = await usersRepository.changePasswordEmail({email , code: codeRecover})

    if (!result) {
        res.status(401)
        res.end('not change recoverCode because user not found')
        return
    }

    accountConfirmationEmail({ sendTo: email, code: codeRecover})

    res.status(200)
    res.end('Email send')

    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
})

router.get('/recover/:registrationCode', async (req, res) => {
    const code = req.params.registrationCode
    const {email, password} = req.body
    try {
        await passwordSchema.validateAsync({password})
    } catch (error) {
            res.status(404)
            res.end(error.message)
            return
    }
    const newPassword =  await encodingBcryptPassword(password)

    let result
    try {
        result = await usersRepository.getRecover({email, code, newPassword})
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
    const infoUser = req.user.user
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
    res.end('user deleted')
    })

router.get('/profile',tokenVerifier, async (req, res) => {
    const infoUser = req.user.user
    const user = await usersRepository.getUserById(infoUser.id) //JWT
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})

router.post('/idUserVotado/votes',tokenVerifier, async (req, res) => {
    const {idVendedor, voto} = req.body

    if (!idVendedor || !voto) {
        res.status(400)
        res.end('body incomplete')
        return
      }

    let newVoto
    try {
        newVoto = await usersRepository.postVoto({voto, idVendedor})
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }
    if (!newVoto) {
        res.status(404)
        res.end('voto not add')
        return
      }

      res.status(200)
      res.end('users voted')
})




module.exports = router