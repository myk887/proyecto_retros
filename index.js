require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())

app.post('/users', async (req, res) => {
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
            password: await cryptPassword(user.password)
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
  }
)


app.get('/users/validate/:registrationCode', async (req, res) => {
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


app.post('/users/login', loginValidatorMiddleware, async (req, res) => {
    const user = req.body

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


app.put('/users/:idUser')

app.put('/users/:idUser/password')

app.put('/users/reset-password')

app.delete('/users/:idUser')

app.get('/users/profile', async (req, res) => {
    const user = await usersRepository.getUserById(req.headers.params) //JWT
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})


app.get('/articulos', async (req, res) => {
    const {categoria, search, order, direction} = req.query
    let travels
    try {
        travels = await travelsRepository.getTravels({categoria, search, order, direction})
    } catch (error) {
    res.status(500)
    res.end(error.message)
    return
    }
    if (!travels.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(travels)
})


app.put('/articulos/:idEntry', async (req, res) => {
    const entryId = req.params.idEntry
    const travel = req.body
    let travel
    try {
        travel = await travelsRepository.putTravelsById(entryId, travel)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!travel.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(travel)
})

app.post('/articulos', async (req, res) => {
    const travel = req.body
    try {
       await entryShema.validateAsync(travel)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
    let newTravel
    try {
        newTravel = await travelsRepository.postTravel(travel)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newTravel || !travel) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(true)
})


app.delete('/articulo/:idArticulo')

app.post('/users/:idUserVotado/votes')

app.get('/articulos/enVenta`')

app.get('/articulos/comprados')

app.get('/articulos/vendidos')

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })