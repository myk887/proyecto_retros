const connection = require('./mysqlConnection')

const getArticlesBySearch = async ({search = ''}) => {

        const articles = await connection.query("select * from articles WHERE name like ? ", [`%${search}%`])

        return articles[0]

}


const postArticle = async ({article, idUser}) => {
        const articles = await connection.query('INSERT INTO articles SET ?', {name: article.name, price: article.price, description: article.description, photo: article.photo, category: article.category, idUser: idUser, createdAt: new Date(), modifiedAt: null})
        return articles[0]

}

const removeArticle = async (id) => {

    const result = await  connection.query('DELETE FROM articles WHERE id = ?', [id])

    if (result[0].affectedRows === 0) return

    return true
  }

  const putArticlesById = async ({articleId, article}) => {

        let modific = 0
        let result
        if (article.name) {result = await connection.query('UPDATE articles SET name = ? WHERE id = ?', [article.name, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.price) {result = await connection.query('UPDATE articles SET price = ? WHERE id = ?', [article.price, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.description) {result = await connection.query('UPDATE articles SET description = ? WHERE id = ?', [article.description, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.photo) {result = await connection.query('UPDATE articles SET photo = ? WHERE id = ?', [article.photo, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.categoria) {result = await connection.query('UPDATE articles SET category = ? WHERE id = ?', [article.categoria, articleId])
        if (result[0].affectedRows === 0) modific += 1}

        if (modific === 5) return false

        return true

}

const getArticleOnSales = async ({userId}) => {
        const articles =await  connection.query('select * from articles WHERE idUser = ? AND buyerId is NULL', [userId])

        if (!articles[0]) return false

        return articles[0]
}

const getArticlesPurchased = async ({userId}) => {
    const articles =await  connection.query('select * from articles WHERE buyerId = ?', [userId])

    if (!articles[0]) return false

    return articles[0]
}

const getArticleSold = async ({userId}) => {
    const articles =await  connection.query('select * from articles WHERE idUser = ? AND buyerId is not NULL', [userId])

    if (!articles[0]) return false

    return articles[0]
}


module.exports = {
    getArticlesBySearch,
    postArticle,
    removeArticle,
    putArticlesById,
    getArticleOnSales,
    getArticlesPurchased,
    getArticleSold
}






