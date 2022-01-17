const connection = require('./../repository/mysqlConnection')

const postVote = async ({vote, idSeller, idUser}) => {
    const [article] = await  connection.query('select * from articles WHERE idUser = ? and buyerId', [idSeller, idUser])
    if (!article.length) return

    const articles = await connection.query('INSERT INTO user_votes SET ?', {vote: vote, idVotedUser: idSeller, createdAt: new Date()})
    return articles[0]

}

module.exports = {
    postVote
}