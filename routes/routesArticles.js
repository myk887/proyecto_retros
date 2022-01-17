const router = require('express').Router()
const articleSchema = require('../schemas/articles')
const tokenVerifier = require('../helpers/tokenVerifier')
const articleRepository = require('../repository/mysql-articles')
const {storagePhotoArticleByCategory} = require('./../helpers/photoStorage')



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
  if (!articles) {
      res.status(404)
      res.end('Articles not found')
      return
  }
  res.status(200)
  res.send(articles)
})

router.get('/subcategory', async (req, res) => {
  const {search, subcategory} = req.query
  let articles
  try {
      articles = await articleRepository.getArticlesBySubcategory({search, category: subcategory})
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
    let newPhoto
    const articleIncomplete = JSON.parse(req.body.article)
    if(req.files) {
      try {
        newPhoto = await storagePhotoArticleByCategory({photo: req.files.photo, category: articleIncomplete.category})
      } catch (error) {
        res.status(500)
        res.end(error.message)
        return
      }}

    const article = {...articleIncomplete, photo: newPhoto}
    const articleId = req.params.idArticle
    const infoUser = req.user.user
    let newArticle
    try {
        newArticle = await articleRepository.putArticlesById({articleId, article, idUser: infoUser.id})
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
    let newPhoto
    const articleIncomplete = JSON.parse(req.body.article)
    try {
        newPhoto = await storagePhotoArticleByCategory({photo: req.files.photo, category: articleIncomplete.category})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    const article = {...articleIncomplete, photo: newPhoto}
    const infoUser = req.user.user
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
    res.send({id: newArticle.insertId})
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
    if (articles === 2) {
      res.status(404)
      res.end('Sold article')
      return
    }
    if (articles === 3) {
      res.status(404)
      res.end('BuyerId === idUser')
      return
    }
    res.status(200)
    res.send(articles.info)

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

router.get('/:idArticle', async (req, res) => {
  const idArticle = req.params.idArticle

try {
  const articles = await articleRepository.getArticlesById({ idArticle })

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
//     newPhoto = storagePhotoArticleByCategory(req.files.photo)
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