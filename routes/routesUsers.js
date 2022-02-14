const express = require('express')
require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRepository = require('./../repository/mysql-users')
const loginSchema = require('./../schemas/loginUsers')
const usersSchema = require('./../schemas/users')
const passwordSchema = require('./../schemas/passwordSchema')
const tokenVerifier = require('./../helpers/tokenVerifier')
const encryptPassword = require('../helpers/encryptPassword')
const passwordVerifier = require('./../helpers/passwordVerifier')
const encryptionCreator = require('../helpers/encryptionCreator')
const {accountConfirmationEmail, accountRecoverCodeEmail} = require('./../notificationEmail/emailSender')
const {storageAvatarUser} = require('./../helpers/photoStorage')


const { JWT_PRIVATE_KEY} = process.env

const app = express()
app.use('/uploads', express.static('uploads'))

router.post('/',  async (req, res) => {
    let newAvatar
    if (req.files) {
        try {
            newAvatar = await storageAvatarUser(req.files.avatar)
        } catch (error) {
            res.status(500)
            res.end(error.message)
            return
        }
    } else {
        newAvatar = './uploads/notAvatar.png'
    }

    const userIncomplete = JSON.parse(req.body.user)
    const user = {...userIncomplete, avatar: newAvatar}

    try {
        await usersSchema.validateAsync(user)
    } catch (error) {
         res.status(404)
         res.end(error.message)
         return
    }

    const codeRegistration = encryptionCreator()
    let newUser
    try {
        newUser = await usersRepository.postUsers({
            ...user,
            registrationCode: codeRegistration,
            password: await encryptPassword(user.password)
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
         await accountConfirmationEmail({ sendTo: newUser.email, code: codeRegistration})

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
        result = await usersRepository.getUserByRegistrationCode(code)
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
            res.status(500)
            res.end(error.message)
            return
        }

    let newUser
    try {
        newUser = await usersRepository.postLogin(user)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newUser) {
        res.status(401)
        res.end('ERROR, please verify email, the introduced one does')
        return
    }
    if (!newUser.active) {
        res.status(404)
        res.end('ERROR, email not verified')
        return
    }
    try {
        if (!await passwordVerifier({password: user.password, mysqlPassword: newUser.mysqlPassword})) {
            res.status(403)
            res.end('Invalid credentials')
            return
            }
    } catch (error) {
        res.status(500)
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
    let newAvatar
    console.log(req.files)
    if (!!req.files) {
     try {
        newAvatar = await storageAvatarUser(req.files.avatar)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }}

    const userIncomplete = JSON.parse(req.body.user)
    const user = {...userIncomplete, avatar: newAvatar ? newAvatar : null}
    try {
        const infoUser = req.user.user
        const newUser = await usersRepository.editUser({user, id: infoUser.id})

        if (!user || !newUser) {
            res.status(400)
            res.end('Any change executed')
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
    const {currentPassword, passwordNew} = req.body
    const infoUser = req.user.user
    const userId = Number(infoUser.id)
    const passwordToChange = await encryptPassword(passwordNew)

    try {
        await passwordSchema.validateAsync({password: passwordNew})
    } catch (error) {
            res.status(404)
            res.end(error.message)
            return
    }

    if (!userId) {
        res.status(404)
        res.end('Wrong token')
        return
    }

    let newUser
    try {
            newUser = await usersRepository.editPatch({id: userId, currentPassword, passwordToChange })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!newUser) {
        res.status(404)
        res.end('Password not changed')
    }

    res.status(200)
    res.end('Successfull change')
    })

router.put('/reset-password', async (req, res) => {
    const {email} = req.body
    const codeRecover = encryptionCreator()

    try {
        const result = await usersRepository.changePasswordEmail({email , code: codeRecover})

    if (!result) {
        res.status(404)
        res.end('Recover code cannot be changed. User not found')
        return
    }

    accountRecoverCodeEmail({ sendTo: email, code: codeRecover})

    res.status(200)
    res.end('Email sent')

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
})

router.get('/recover/:registrationCode', async (req, res) => {
    const code = req.params.registrationCode
    const {email, password} = req.body
    try {
        console.log(req.files)
        await passwordSchema.validateAsync({password})
    } catch (error) {
            res.status(400)
            res.end(error.message)
            return
    }
    const newPassword =  await encryptPassword(password)

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


router.delete('/profile', tokenVerifier, async (req, res) => {
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

    if (!userDelete) {
        res.status(404)
        res.end('User does not exist')
    }

    res.status(200)
    res.end('user deleted')
    })

router.get('/profile',tokenVerifier, async (req, res) => {
    const infoUser = req.user.user
    const user = await usersRepository.getUserById(infoUser.id)
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})
router.get('/name/:id', async (req, res) => {
    const id = req.params.id
    const user = await usersRepository.getUsersName({id})
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})

// router.post('/avatar', tokenVerifier, async (req, res) => {
//     let newAvatar
//     try {
//       newAvatar = storageAvatarUser(req.files.avatar)
//     } catch (error) {
//         res.status(500)
//         res.end(error.message)
//         return
//     }
//     const userAvatar = {Avatar: newAvatar}
//     const infoUser = req.user.user
  
//     if (!userAvatar ) {
//       res.status(404)
//       res.end('Error to user Avatar')
//       return
//   }
  
//     let newUserAvatar
//     try {
//       newUserAvatar = await usersRepository.postUserAvatar({avatar: userAvatar, id: infoUser.id})
//     } catch (error) {
//         res.status(500)
//         res.end(error.message)
//         return
//     }
//     if (!newUserAvatar) {
//         res.status(404)
//         res.end('User not found')
//         return
//     }
//     res.status(200)
//     res.send(true)
//   })




module.exports = router
