require('dotenv').config()
const router = require('express').Router()
const tokenVerifier = require('./../helpers/tokenVerifier')
const votesRepository = require('./../repository/mysql-votes')



router.post('/idVotedUser/votes',tokenVerifier, async (req, res) => {
    const {idSeller, vote} = req.body

    if (!idSeller || !vote) {
        res.status(404)
        res.end('incomplete body')
        return
      }

    let newVote
    try {
        newVote = await votesRepository.postVote({vote, idSeller})
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