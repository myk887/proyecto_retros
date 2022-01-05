// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const connection = require('./../repositorio/mysqlConnection')

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

const getArticleEnVenta = async (userId) => {
        const articles =await  connection.query('select * from articulos where idUser = ? AND compradorId = NULL', [userId])
        return articles[0]
}

const getArticlesBySearchComprados = async (userId) => {
    const articles =await  connection.query('select * from articulos where compradorId = ?', [userId])
    return articles[0]
}

const getArticlesBySearchVendidos = async (userId) => {
    const articles =await  connection.query('select * from articulos where idUser = ? AND compradorId <> NULL', [userId])
    return articles[0]
}

const postVoto = async ({voto, idVendedor}) => {
    const at = dateNow()

    const articles = await connection.query('INSERT INTO user_votes SET ?', {vote: voto, idUserVotado: idVendedor, createdAt: at})
    return articles[0]

}


module.exports = {
    getArticlesBySearch,
    postArticle,
    removeArticle,
    putArticlesById,
    getArticleEnVenta,
    getArticlesBySearchComprados,
    getArticlesBySearchVendidos,
    postVoto
}






