const router = require('express').Router()
const articleShema = require('./../shemas/articulos')
const comprobadorToken = require('./../helpers/comprobadorToken')


router.get('/', async (req, res) => {
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


router.put('/:idArticle', async (req, res) => {
    const articleId = req.params.idArticle
    const article = req.body
    let newArticle
    try {
        newArticle = await articlesRepository.putArticlesById(articleId, article)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newArticle.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(newArticle)
})

router.post('/', async (req, res) => {
    const article = req.body
    try {
       await articleShema.validateAsync(article)
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


router.delete('/:idarticle', comprobadorToken, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)
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

router.post('/dUserVotado/votes',comprobadorToken, async (req, res) => {
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

router.get('/enVenta', comprobadorToken,  async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  const users = await usersRepository.getArticleEnVenta({ userId})

  if (!article) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(article)
})

router.get('/comprados', comprobadorToken,  async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  const users = await usersRepository.getArticlesComprados({ userId })

  if (!users) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(users)
})

router.get('/vendidos', comprobadorToken, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  const users = await usersRepository.getArticlesVendidos({ userId})

  if (!users) {
    res.status(404)
    res.end('Users not found')
    return
  }
  res.status(200)
  res.send(users)
})



module.exports = router