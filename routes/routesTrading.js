require('dotenv').config()
const router = require('express').Router()
const tokenVerifier = require('./../helpers/tokenVerifier')
const tradingRepository = require('./../repository/mysql-trading')
const trading = require('./../schemas/trading')
const moment = require('moment')



router.post('/userBuyer',tokenVerifier, async (req, res) => {
    const {idSeller, articleId} = req.body
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

    if (!idSeller) {
        res.status(404)
        res.end('incomplete body, idSeller')
        return
    }
    if (!articleId) {
        res.status(404)
        res.end('incomplete body, articleId')
        return
    }

    if (idSeller === userId) {
        res.status(404)
        res.end('idSeller === userId')
        return
    }
    let newTrading
    try {
        newTrading = await tradingRepository.postTrading({ idSeller, idUser: userId, articleId})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newTrading) {
        res.status(404)
        res.end('Question not sent')
        return
      }

      res.status(200)
      res.end('Question sent')
})

router.post('/userSeller',tokenVerifier, async (req, res) => {
    const {idBuyer, articleId, tradingInfo} = req.body
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

    if (!idBuyer) {
        res.status(404)
        res.end('incomplete body')
        return
    }
    if (!articleId) {
        res.status(404)
        res.end('incomplete body')
        return
    }

    if (idBuyer === userId) {
        res.status(404)
        res.end('idBuyer === userId')
        return
    }

    const result = moment(tradingInfo.saleDate, 'YYYY-MM-DD',true).isValid()

    const result2 = moment(tradingInfo.saleHour, 'H:m:s', true).isValid()

   if (tradingInfo.buy) { if (!result) {
        res.status(404)
        res.end('Date incorrect')
        return
    }
    if (!result2) {
        res.status(404)
        res.end('Hour incorrect')
        return
    }}
    let newTrading
    try {
        newTrading = await tradingRepository.postTradingSeller({ idBuyer, idUser: userId, articleId, tradingInfo})
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newTrading) {
        res.status(404)
        res.end('Answer not sent')
        return
      }

      res.status(200)
      res.end('Answer sent')
})

router.get('/userSeller', tokenVerifier,  async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

  try {
    const result = await tradingRepository.getTradingSeller({ idUser: userId })

    if (!result) {
      res.status(404)
      res.end('Articles not found')
      return
    }
    res.status(200)
    res.send(result)

  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
})

router.get('/userBuyer', tokenVerifier,  async (req, res) => {
    const infoUser = req.user.user
    const userId = Number(infoUser.id)

  try {
    const result = await tradingRepository.getTradingBuyer({ idUser:userId })

    if (!result) {
      res.status(404)
      res.end('Articles not found')
      return
    }
    res.status(200)
    res.send(result)

  } catch (error) {
    res.status(500)
    res.end(error.message)
    return
  }
})

router.post('/voted', tokenVerifier,  async (req, res) => {
  const {idSeller, articleId} = req.body
  const infoUser = req.user.user
  const userId = Number(infoUser.id)

try {
  const result = await tradingRepository.postVotedBoolean({ idUser:userId, idSeller, articleId })

  if (!result) {
    res.status(404)
    res.end('Voted boolena error')
    return
  }
  res.status(200)
  res.send('ok')

} catch (error) {
  res.status(500)
  res.end(error.message)
  return
}
})

module.exports = router