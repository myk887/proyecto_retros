const connection = require('./../repository/mysqlConnection')

const getArticlesBySearch = async ({search = ''}) => {

        const articles = await connection.query("select * from articulos WHERE name like ? ", [`%${search}%`])

        return articles[0]

}


const postArticle = async ({article, idUser}) => {
        const articles = await connection.query('INSERT INTO articulos SET ?', {name: article.name, price: article.price, description: article.description, photo: article.photo, categoria: article.category, idUser: idUser, createdAt: new Date(), modifiedAt: null})
        return articles[0]

}

const removeArticle = async (id) => {

    const result = await  connection.query('DELETE FROM articulos WHERE id = ?', [id])

    if (result[0].affectedRows === 0) return

    return true
  }

  const putArticlesById = async ({articleId, article}) => {

        let modific = 0
        let result
        if (article.name) {result = await connection.query('UPDATE articulos SET name = ? WHERE id = ?', [article.name, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.price) {result = await connection.query('UPDATE articulos SET price = ? WHERE id = ?', [article.price, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.description) {result = await connection.query('UPDATE articulos SET description = ? WHERE id = ?', [article.description, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.photo) {result = await connection.query('UPDATE articulos SET photo = ? WHERE id = ?', [article.photo, articleId])
        if (result[0].affectedRows === 0) modific += 1}
        if (article.categoria) {result = await connection.query('UPDATE articulos SET categoria = ? WHERE id = ?', [article.categoria, articleId])
        if (result[0].affectedRows === 0) modific += 1}

        if (modific === 5) return false

        return true

}

const getArticleOnSales = async ({userId}) => {
        const articles =await  connection.query('select * from articulos WHERE idUser = ? AND compradorId is NULL', [userId])

        if (!articles[0]) return false

        return articles[0]
}

const getArticlesPurchased = async ({userId}) => {
    const articles =await  connection.query('select * from articulos WHERE compradorId = ?', [userId])

    if (!articles[0]) return false

    return articles[0]
}

const getArticleSold = async ({userId}) => {
    const articles =await  connection.query('select * from articulos WHERE idUser = ? AND compradorId is not NULL', [userId])

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






