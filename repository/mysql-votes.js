const connection = require('./../repository/mysqlConnection')

const postVote = async ({vote, idSeller}) => {

    const articles = await connection.query('INSERT INTO user_votes SET ?', {vote: vote, idVotedUser: idSeller, createdAt: new Date()})
    return articles[0]

}

module.exports = {
    postVote
}