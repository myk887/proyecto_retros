// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const connection = require('./../repositorio/mysqlConnection')

const getArticles = async ({search= '', order= 'place', direction = 'ASC'}) => {
    let orderBy
    switch (order) {
        default:
        case 'price':
            orderBy = 'price'
            break;
        case 'id':
            orderBy = 'id'
            break;
        case 'createAt':
            orderBy = 'createAd'
            break;
    }
    let directionTo
    switch (direction.toUpperCase) {
        default:
        case 'ASC':
            directionTo = 'ASC'
            break;
        case 'DESC':
            directionTo = 'DESC'
            break;
    }
        const articles = await connection.query("select * from articulos WHERE place like ? order by ? ?", [`%${search}%`, orderBy, directionTo])

        return articles[0]

}

const dateNow = () => {
    const date = new Date()
    const newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return newDate
}

const postArticle = async ({article, idUser}) => {
    const at = dateNow()

        const articles = await connection.query('INSERT INTO articulos SET ?', {name: article.name, price: article.price, description: article.description, photo: article.photo, categoria: article.categoria, idUser: idUser, createdAt: at, modifiedAt: null})
        return articles[0]

}

const removeArticle = async ({id}) => {
    const result = await  conection.query('DELETE FROM articulos WHERE id = ?', [id])

    if (result[0].affectedRows === 0) return

    return true
  }

  const putArticlesById = async ({articleId, article}) => {

        let modific = 0
        let result = await connection.query('UPDATE articulos SET name = ? WHERE id = ?', [article.name, articleId])
        if (result[0].affectedRows === 0) modific += 1
        result = await connection.query('UPDATE articulos SET price = ? WHERE id = ?', [article.price, articleId])
        if (result[0].affectedRows === 0) modific += 1
        result = await connection.query('UPDATE articulos SET description = ? WHERE id = ?', [article.description, articleId])
        if (result[0].affectedRows === 0) modific += 1
        result = await connection.query('UPDATE articulos SET photo = ? WHERE id = ?', [article.photo, articleId])
        if (result[0].affectedRows === 0) modific += 1
        result = await connection.query('UPDATE articulos SET categoria = ? WHERE id = ?', [article.categoria, articleId])
        if (result[0].affectedRows === 0) modific += 1

        if (modific === 5) return

        return true

}

const getArticleEnVenta = async (userId) => {
        const articles =await  connection.query('select * from articulos where idUser = ? AND compradorId = NULL', [userId])
        return articles[0]
}

const getArticlesComprados = async (userId) => {
    const articles =await  connection.query('select * from articulos where compradorId = ?', [userId])
    return articles[0]
}

const getArticleEnVenta = async (userId) => {
    const articles =await  connection.query('select * from articulos where idUser = ? AND compradorId <> NULL', [userId])
    return articles[0]
}

const postVoto = async ({voto, idVendedor}) => {
    const at = dateNow()

    const articles = await connection.query('INSERT INTO user_votes SET ?', {vote: voto, idUserVotado: idVendedor, createdAt: at})
    return articles[0]

}


module.exports = {
    getArticles,
    postArticle,
    removeArticle,
    putArticlesById,
    getArticleEnVenta,
    getArticlesComprados,
    getArticleEnVenta,
    postVoto
}






