const connection = require('./../repository/mysqlConnection')

const postVote = async ({vote, idSeller, idUser, articleId}) => {
    const [article] = await  connection.query('select * from articles WHERE id = ? AND idUser = ? AND buyerId = ?', [articleId, idSeller, idUser])
    if (!article.length) return

    const articles = await connection.query('INSERT INTO user_votes SET ?', {vote: vote, idVotedUser: idSeller, createdAt: new Date()})
    return articles[0]

}

module.exports = {
    postVote
}