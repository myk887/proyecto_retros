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


app.put('/users/:idUser', async (req, res) => {
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

app.patch('/users/change/password',async (req, res) => {
    const {password} = req.body
    const userId = Number(req.headers.authorization.id)

    try {
        await passwodShema.validateAsync(user)
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

app.put('/users/reset-password') // hacer con envio de email


app.delete('/users/proflie', async (req, res) => {
    const userId = Number(req.headers.authorization.id)
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

app.get('/users/profile', async (req, res) => {
    const user = await usersRepository.getUserById(req.headers.authorization) //JWT
    if (!user) {
        res.status(404)
        res.end('Users not found')
        return
    }
    res.status(200)
    res.send(user)
})


app.get('/articles', async (req, res) => {
    const {categoria, search, order, direction} = req.query
    let articles
    try {
        articles = await articlesRepository.getArticles({categoria, search, order, direction})
    } catch (error) {
    res.status(500)
    res.end(error.message)
    return
    }
    if (!articles.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(articles)
})


app.put('/articles/:idEntry', async (req, res) => {
    const entryId = req.params.idEntry
    const article = req.body
    let article
    try {
        article = await articlesRepository.putArticlesById(entryId, article)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!article.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(article)
})

app.post('/articles', async (req, res) => {
    const article = req.body
    try {
       await entryShema.validateAsync(article)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
    let newArticle
    try {
        newArticle = await articleRepository.postArticle(article)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newArticle || !article) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(true)
})


app.delete('/article/:idarticle', async (req, res) => {
    const userId = Number(req.headers.authorization.id)
    let articleDelete

    try {
        userDelete = await articleRepository.removeArticle(userId)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }

    if (!userId) {
      res.status(404)
      res.end('User not found')
      return
    }
    if (!articleDelete) {
      res.status(404)
      res.end('User not exits')
      return
    }

    res.status(200)
    res.end('article deleted')
  })

app.post('/users/:idUserVotado/votes', async (req, res) => {
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
        res.end('voto not add') // ???????????????????????
        return
      }

      res.status(200)
      res.end('article deleted')
})

app.get('/articles/enVenta',  async (req, res) => {
    const userId = Number(req.headers.authorization.id)

  const users = await usersRepository.getArticleEnVenta({ userId})

  if (!article) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(article)
})

app.get('/articles/comprados',  async (req, res) => {
    const userId = Number(req.headers.authorization.id)

  const users = await usersRepository.getArticlesComprados({ userId })

  if (!users) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(users)
})

app.get('/articles/vendidos',  async (req, res) => {
    const userId = Number(req.headers.authorization.id)

  const users = await usersRepository.getArticlesVendidos({ userId})

  if (!users) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(users)
})

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })