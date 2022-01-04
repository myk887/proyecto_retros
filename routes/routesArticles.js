const router = require('express').Router()
const articleSchema = require('./../schemas/articleSchema')
const tokenVerifier = require('./../helpers/tokenVerifier')


router.get('/', async (req, res) => {
    const {category, search, order, direction} = req.query
    let articles
    try {
        articles = await articlesRepository.getArticles({category, search, order, direction})
    } catch (error) {
    res.status(500)
    res.end(error.message)
    return
    }
    if (!articles.length) {
        res.status(404)
        res.end('Entries not found')
        return
    }
    res.status(200)
    res.send(articles)
})


router.put('/:idArticle', tokenVerifier, async (req, res) => {
    const articleId = req.params.idArticle
    const article = req.body
    let newArticle
    try {
        newArticle = await articlesRepository.putArticlesById({articleId, article})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newArticle.length) {
        res.status(404)
        res.end('Entries not found')
        return
    }
    res.status(200)
    res.send(newArticle)
})

router.post('/', tokenVerifier, async (req, res) => {
    const infoUser = req.user
    const article = req.body
    try {
       await articleSchema.validateAsync(article)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
    let newArticle
    try {
        newArticle = await articleRepository.postArticle({article, idUser: infoUser.id})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newArticle || !article) {
        res.status(404)
        res.end('Entries not found')
        return
    }
    res.status(200)
    res.send(true)
})


router.delete('/:idarticle', tokenVerifier, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)
    const {idArticle} = req.body
    let articleDelete

    try {
        userDelete = await articleRepository.removeArticle(idArticle)
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

router.post('/idVotedUser/votes', tokenVerifier, async (req, res) => {
    const {idVendedor, voto} = req.body

    if (!idSeller || !voto) {
        res.status(400)
        res.end('body incomplete')
        return
      }

    let newVoto
    try {
        newVoto = await usersRepository.postVote({vote, idSeller})
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }
    if (!newVote) {
        res.status(404)
        res.end('Vote not add')
        return
      }

      res.status(200)
      res.end('User voted')
})

router.get('/onSales', tokenVerifier,  async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  try {
    const users = await usersRepository.getArticleOnSales({userId})

    if (!article) {
      res.status(404)
      res.end('Users not found')
      return
    }
    res.status(200)
    res.send(article)

  } catch (error) {
        res.status(501)
        res.end(error.message)
        return
  }
})

router.get('/comprados', tokenVerifier,  async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  try {
    const users = await usersRepository.getArticlesPurchased({ userId })

    if (!users) {
      res.status(404)
      res.end('User not found')
      return
    }
    res.status(200)
    res.send(users)

  } catch (error) {
    res.status(501)
    res.end(error.message)
    return
  }
})

router.get('/vendidos', tokenVerifier, async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  try {
    const users = await usersRepository.getArticlesSold({ userId})

    if (!users) {
      res.status(404)
      res.end('User not found')
      return
    }
    res.status(200)
    res.send(users)

  } catch (error) {
    res.status(501)
    res.end(error.message)
    return
  }
})



module.exports = router