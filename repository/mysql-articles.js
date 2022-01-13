const connection = require('./mysqlConnection')

const searchArticlesByName = async ({search = ''}) => {

        const articles = await connection.query("select * from articles WHERE name like ? ", [`%${search}%`])

        return articles[0]
}

const getArticlesBySubcategory = async ({search = '', category}) => {

    const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, category])

    return articles[0]
}

const getArticlesByCategory = async ({search = '', category}) => {
// AUDIO
  if(category === 'audio') {
    const audiosArray = ['alatavoces', 'mp3', 'radios', 'tocadiscos', 'walkman']
    const result = []
    const busqueda = audiosArray.map( async (a) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, a])
        result.push(articles[0])
        return result
      })
      console.log(result)
      return await busqueda[4]
  }
  // ELECTRONICA
  if(category === 'electronica') {
    const electronicaArray = ['cables', 'despertadores', 'gps', 'librosElectronicos', 'maquinasEscribir', 'tdt']
    const result = []
    const busqueda = electronicaArray.map( async (e) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, e])
        result.push(articles[0])
        return result
    })
    return await busqueda[5]
  }
  // GAMING
  if(category === 'gaming') {
    const gamingArray = ['cartuchos', 'consolas']
    const result = []
    const busqueda = gamingArray.map( async (g) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, g])
        result.push(articles[0])
        return result
    })
    return await busqueda[1]
  }
  // IMAGEN
  if(category === 'imagen') {
    const imageneArray = ['camaraFotos', 'camaraVideo', 'televisores']
    const result = []
    const busqueda = imageneArray.map( async (i) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, i])
        result.push(articles[0])
        return result
      })
      return await busqueda[2]
  }
  // INFORMATICA
  if(category === 'informatica') {
    const informaticaArray = ['accesorios', 'monitores', 'ordenadores', 'teclados']
    const result = []
    const busqueda = informaticaArray.map( async (i) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, i])
        result.push(articles[0])
        return result
      })
      return await busqueda[3]
  }
  // MUSICA
  if(category === 'musica') {
      const musicaArray = ['cintas', 'vinilos']
      const result = []
      const busqueda = musicaArray.map( async (m) =>  {
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, m])
        result.push(articles[0])
        return result
      })
      return await busqueda[1]
  }
  // TELEFONOS
  if(category === 'telefonos') {
      const telefonosArray = ['fijos', 'moviles']
      const busqueda = telefonosArray.map( async (t) =>  {
        const result = []
        const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, t])
        result.push(articles[0])
        return result
      })
      return await busqueda[1]
  }
}

const postArticle = async ({article, idUser}) => {
        const articles = await connection.query('INSERT INTO articles SET ?', {name: article.name, price: article.price, description: article.description, photo: article.photo, category: article.category, idUser: idUser, createdAt: new Date(), modifiedAt: null})
        return articles[0]

}

const removeArticle = async ({idArticle, userId}) => {

    const result = await  connection.query('DELETE FROM articles WHERE id = ? AND idUser = ?', [idArticle, userId])

    if (result[0].affectedRows === 0) return

    return true
  }

  const putArticlesById = async ({articleId, article, idUser}) => {

        let result
        if (article.name) {result = await connection.query('UPDATE articles SET name = ? WHERE id = ? and idUser = ?', [article.name, articleId, idUser])}

        if (article.price) {result = await connection.query('UPDATE articles SET price = ? WHERE id = ? and idUser = ?', [article.price, articleId, idUser])}

        if (article.description) {result = await connection.query('UPDATE articles SET description = ? WHERE id = ? and idUser = ?', [article.description, articleId, idUser])}

        if (article.photo) {result = await connection.query('UPDATE articles SET photo = ? WHERE id = ? and idUser = ?', [article.photo, articleId, idUser])}

        if (article.categoria) {result = await connection.query('UPDATE articles SET category = ? WHERE id = ? and idUser = ?', [article.categoria, articleId, idUser])}

        return true

}

const getArticleOnSales = async ({userId}) => {
        const articles = await  connection.query('select * from articles WHERE idUser = ? AND buyerId is NULL', [userId])

        if (!articles[0]) return false

        return articles[0]
}

const getArticlesPurchased = async ({userId}) => {
    const articles = await  connection.query('select * from articles WHERE buyerId = ?', [userId])

    if (!articles[0]) return false

    return articles[0]
}

const getArticleSold = async ({userId}) => {
    const articles = await  connection.query('select * from articles WHERE idUser = ? AND buyerId is not NULL', [userId])

    if (!articles[0]) return false

    return articles[0]
}


const postArticleSold = async ({userId, articleId}) => {
    const articles = await connection.query('UPDATE articles SET buyerId = ? WHERE id = ?', [userId, articleId])

    if (!articles[0]) return false

    return articles[0]
}

// const postArticlePhoto = async ({articlePhoto, idArticle}) => {
//     const articles = await connection.query('UPDATE articles SET photo = ? WHERE id = ?', [articlePhoto, idArticle])

//     if (!articles[0]) return false

//     return articles[0]
// }


module.exports = {
    searchArticlesByName,
    getArticlesBySubcategory,
    getArticlesByCategory,
    postArticle,
    removeArticle,
    putArticlesById,
    getArticleOnSales,
    getArticlesPurchased,
    getArticleSold,
    postArticleSold
}






