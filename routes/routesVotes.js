require('dotenv').config()
const router = require('express').Router()
const tokenVerifier = require('./../helpers/tokenVerifier')
const votesRepository = require('./../repository/mysql-votes')
const votesSchema = require('./../schemas/votesSchema')



router.post('/idVotedUser/votes',tokenVerifier, async (req, res) => {
    const {idSeller, vote, articleId} = req.body
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

    try {
        await votesSchema.validateAsync({vote: vote.toString()})
    } catch (error) {
         res.status(404)
         res.end(error.message)
         return
    }

    if (!idSeller) {
        res.status(404)
        res.end('incomplete body')
        return
    }

    if (idSeller === userId) {
        res.status(404)
        res.end('idSeller === userId')
        return
    }
    let newVote
    try {
        newVote = await votesRepository.postVote({vote, idSeller, idUser: userId, articleId})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newVote) {
        res.status(404)
        res.end('vote not added')
        return
      }

      res.status(200)
      res.end('user voted')
})

module.exports = router