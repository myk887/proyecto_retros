const router = require('express').Router()
const articleSchema = require('./../schemas/articulos')
const tokenVerifier = require('./../helpers/tokenVerifier')
const articleRepository = require('./../repository/mysql-articulos')



router.get('/', async (req, res) => {
    const {search} = req.query
    let articles
    try {
        articles = await articleRepository.getArticlesBySearch({search})
    } catch (error) {
    res.status(500)
    res.end(error.message)
    return
    }
    if (!articles.length) {
        res.status(404)
        res.end('Articles not found')
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
        newArticle = await articleRepository.putArticlesById({articleId, article})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newArticle) {
        res.status(404)
        res.end('articles not found')
        return
    }
    res.status(200)
    res.send(newArticle)
})

router.post('/', tokenVerifier, async (req, res) => {
    const infoUser = req.user.user
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
        res.end('articles not found')
        return
    }
    res.status(200)
    res.send(true)
})


router.delete('/:idArticle', tokenVerifier, async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)
    const idArticle = req.params.idArticle
    let articleDelete

    try {
      articleDelete = await articleRepository.removeArticle(idArticle)
    } catch (error) {
        res.status(500)
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
      res.end('Article not exits')
      return
    }

    res.status(200)
    res.end('Article deleted')
  })


router.get('/onSales', tokenVerifier,  async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

  try {
    const articles = await articleRepository.getArticleOnSales({ userId})

    if (!articles) {
      res.status(404)
      res.end('Users not found')
      return
    }
    res.status(200)
    res.send(articles)

  } catch (error) {
        res.status(500)
        res.end(error.message)
        return
  }
})

router.get('/purchased', tokenVerifier,  async (req, res) => {
    const infoUser = req.user
    const userId = Number(infoUser.id)

  try {
    const articles = await articleRepository.getArticlesPurchased({ userId })

    if (!articles) {
      res.status(404)
      res.end('Articles not found')
      return
    }
    res.status(200)
    res.send(articles)

  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
})

router.get('/sold', tokenVerifier, async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

  try {
    const articles = await articleRepository.getArticleSold({ userId})

    if (!articles) {
      res.status(404)
      res.end('Articles not found')
      return
    }
    res.status(200)
    res.send(articles)

  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
})



module.exports = router