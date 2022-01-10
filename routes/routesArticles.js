const router = require('express').Router()
const articleSchema = require('../schemas/articles')
const tokenVerifier = require('../helpers/tokenVerifier')
const articleRepository = require('../repository/mysql-articles')
const {storagePhotoArticle} = require('./../helpers/photoStorage')



router.get('/', async (req, res) => {
    const {search} = req.query
    let articles
    try {
        articles = await articleRepository.searchArticlesByName({search})
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

router.get('/category', async (req, res) => {
  const {search, category} = req.query
  let articles
  try {
      articles = await articleRepository.getArticlesByCategory({search, category})
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
        res.end('Articles not found')
        return
    }
    res.status(200)
    res.send(newArticle)
})

router.post('/', tokenVerifier, async (req, res) => {
      // const newPhoto = photoStorage(req.files.photo)
    // const article = {...req.body, photo: newPhoto}
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
    if (!newArticle) {
        res.status(404)
        res.end('Articles not found')
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

    if (!idArticle) {
      res.status(404)
      res.end('Error in idArticle')
      return
    }

    try {
      articleDelete = await articleRepository.removeArticle({idArticle, userId})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (!articleDelete) {
      res.status(404)
      res.end('Article does not exist')
      return
    }

    res.status(200)
    res.end('Article deleted')
  })

router.post('/sold', tokenVerifier,  async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)
    const articleId = req.body.articleId

  if (!articleId) {
    res.status(404)
    res.end('Error in body')
    return
  }

  try {
    const articles = await articleRepository.postArticleSold({ userId, articleId})

    if (!articles) {
      res.status(404)
      res.end('User not found')
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


router.get('/onSales', tokenVerifier,  async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

  try {
    const articles = await articleRepository.getArticleOnSales({ userId})

    if (!articles) {
      res.status(404)
      res.end('User not found')
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
    const infoUser = req.user.user
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


// router.post('/photo', tokenVerifier, async (req, res) => {
//   let newPhoto
//   try {
//     newPhoto = storagePhotoArticle(req.files.photo)
//   } catch (error) {
//       res.status(500)
//       res.end(error.message)
//       return
//   }
//   const articlePhoto = {photo: newPhoto}
//   const infoUser = req.user.user
//   const idArticle = req.body

//   if (!articlePhoto ) {
//     res.status(404)
//     res.end('Error to article photo')
//     return
// }

//   let newArticlePhoto
//   try {
//     newArticlePhoto = await articleRepository.postArticlePhoto({articlePhoto, idArticle})
//   } catch (error) {
//       res.status(500)
//       res.end(error.message)
//       return
//   }
//   if (!newArticlePhoto) {
//       res.status(404)
//       res.end('Articles not found')
//       return
//   }
//   res.status(200)
//   res.send(true)
// })


module.exports = router