const connection = require('./mysqlConnection')

const searchArticlesByName = async ({search = ''}) => {

        const articles = await connection.query("select * from articles WHERE name like ? AND buyerId is NULL", [`%${search}%`])

        return articles[0]
}

const getArticlesBySubcategory = async ({search = '', category}) => {
    const articles = await connection.query("select * from articles WHERE name like ? AND category = ? AND buyerId is NULL", [`%${search}%`, category])
    return articles[0]
}

const getArticlesByCategory = async ({search = '', category}) => {
// AUDIO
  if(category === 'audio') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ? OR category = ? OR category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'altavoces', 'mp3', 'radios', 'tocadiscos', 'walkman'])
    return articles[0]
  }
  // ELECTRONICA
  if(category === 'electronica') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ? OR category = ? OR category = ? OR category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'cables', 'despertadores', 'gps', 'librosElectronicos', 'maquinasEscribir', 'tdt'])
    return articles[0]
  }
  // GAMING
  if(category === 'gaming') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'cartuchos', 'consolas'])
    return articles[0]
  }
  // IMAGEN
  if(category === 'imagen') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'camaraFotos', 'camaraVideo', 'televisores'])
    return articles[0]
  }
  // INFORMATICA
  if(category === 'informatica') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ? OR category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'accesorios', 'monitores', 'ordenadores', 'teclados'])
    return articles[0]
  }
  // MUSICA
  if(category === 'musica') {
    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'cintas', 'vinilos'])
    return articles[0]
  }
  // TELEFONOS
  if(category === 'telefonos') {

    const articles = await connection.query("select * from articles WHERE name like ? AND (category = ? OR category = ?) AND buyerId is NULL", [`%${search}%`, 'fijos', 'moviles'])
    return articles[0]
  }
}

const postArticle = async ({article, idUser}) => {
        const articles = await connection.query('INSERT INTO articles SET ?', {name: article.name, price: article.price, description: article.description, location: article.location, province: article.province, photo: article.photo, category: article.category, idUser: idUser, createdAt: new Date(), modifiedAt: null})
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
        if (article.name) {if(!result[0].affectedRows) return}

        if (article.price) {result = await connection.query('UPDATE articles SET price = ? WHERE id = ? and idUser = ?', [article.price, articleId, idUser]), console.log(result[0])}
        if (article.price) {if(!result[0].affectedRows) return}

        if (article.description) {result = await connection.query('UPDATE articles SET description = ? WHERE id = ? and idUser = ?', [article.description, articleId, idUser]), console.log(result[0])}
        if (article.description) {if(!result[0].affectedRows) return}

        if (article.photo) {result = await connection.query('UPDATE articles SET photo = ? WHERE id = ? and idUser = ?', [article.photo, articleId, idUser])}
        if (article.photo) {if(!result[0].affectedRows) return}

        if (article.category) {result = await connection.query('UPDATE articles SET category = ? WHERE id = ? and idUser = ?', [article.category, articleId, idUser])}
        if (article.category) {if(!result[0].affectedRows) return}

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
    const [[{idUser, buyerId}]] = await  connection.query('select idUser, buyerId  from articles WHERE id = ?', [articleId])

    if(buyerId) return 2
    if((idUser*1) === (userId*1)) return 3

    const articles = await connection.query('UPDATE articles SET buyerId = ? WHERE id = ?', [userId, articleId])

    if (!articles[0].affectedRows) return false

    return articles[0]
}

const reducer = (acumulador, media) => {
  return (acumulador + media)
}

const getArticlesById = async ({idArticle}) => {
  const [[articles]] = await  connection.query('select * from articles WHERE id = ?', [idArticle])

  const [votes]= await  connection.query('select vote from user_votes WHERE idVotedUser = ?', [articles.idUser])

  let allVotes = []
  votes.forEach(v => allVotes.push(v.vote))

  const [averageVotes] = ['media'].map(v => {return {avarage: allVotes.length ? (allVotes.reduce(reducer)/allVotes.length) : 0}})

  if (!articles) return false

  return {...articles, userAverageVotes: averageVotes.avarage}
}



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
    postArticleSold,
    getArticlesById
}






