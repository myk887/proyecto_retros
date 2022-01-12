const connection = require('./mysqlConnection')

const searchArticlesByName = async ({search = ''}) => {

        const articles = await connection.query("select * from articles WHERE name like ? ", [`%${search}%`])

        return articles[0]
}

const getArticlesByCategory = async ({search = '', category}) => {

    const articles = await connection.query("select * from articles WHERE name like ? AND category = ?", [`%${search}%`, category])

    return articles[0]
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

  const putArticlesById = async ({articleId, article}) => {

        let result
        if (article.name) {result = await connection.query('UPDATE articles SET name = ? WHERE id = ?', [article.name, articleId])}

        if (article.price) {result = await connection.query('UPDATE articles SET price = ? WHERE id = ?', [article.price, articleId])}

        if (article.description) {result = await connection.query('UPDATE articles SET description = ? WHERE id = ?', [article.description, articleId])}

        if (article.photo) {result = await connection.query('UPDATE articles SET photo = ? WHERE id = ?', [article.photo, articleId])}

        if (article.categoria) {result = await connection.query('UPDATE articles SET category = ? WHERE id = ?', [article.categoria, articleId])}

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

const postArticlePhoto = async ({articlePhoto, idArticle}) => {
    const articles = await connection.query('UPDATE articles SET photo = ? WHERE id = ?', [articlePhoto, idArticle])

    if (!articles[0]) return false

    return articles[0]
}


module.exports = {
    searchArticlesByName,
    getArticlesByCategory,
    postArticle,
    removeArticle,
    putArticlesById,
    getArticleOnSales,
    getArticlesPurchased,
    getArticleSold,
    postArticleSold,
    postArticlePhoto
}






