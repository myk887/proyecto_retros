const connection = require('./../repository/mysqlConnection')

const postTrading = async ({idSeller, idUser, articleId}) => {
    const [article] = await  connection.query('select * from articles WHERE id = ? and idUser = ? and buyerId is NULL', [articleId, idSeller])
    if (!article.length) return

    const res = await connection.query('INSERT INTO trading_user SET ?', {idArtilce: articleId, sellerId: idSeller, buyerId: idUser, createdAt: new Date()})
    return res[0]
}

const postTradingSeller = async ({idBuyer, idUser, articleId, tradingInfo}) => {
    const [article] = await  connection.query('select * from articles WHERE id = ? and idUser = ? and buyerId is NULL', [articleId, idUser])
    if (!article.length) return

    const [[comprobation]] = await  connection.query('select * from trading_user WHERE idArtilce = ? and sellerId = ? and buyerId = ?', [articleId, idUser, idBuyer])
    if (comprobation.sellerId === comprobation.buyerId) return

    if (tradingInfo.buy === 1) {const res = await connection.query('UPDATE trading_user SET ? WHERE idArtilce = ? and sellerId = ? and buyerId = ?', [{buy: tradingInfo.buy, saleDate: (tradingInfo.saleDate + ' ' + tradingInfo.saleHour), salePlace: tradingInfo.salePlace}, articleId, idUser, idBuyer])
    return res[0].affectedRows}

    if (tradingInfo.buy === 0) {const res = await connection.query('UPDATE trading_user SET ? WHERE idArtilce = ? and sellerId = ? and buyerId = ?', [{buy: tradingInfo.buy}, articleId, idUser, idBuyer])
    return res[0].affectedRows}
}

const getTradingBuyer = async ({idUser}) => {
    const [comprobation] = await  connection.query('select * from trading_user WHERE buyerId = ?', [idUser])
    if (!comprobation) return
    const array = []
    for (let index = 0; index < comprobation.length; index++) {
        const element = comprobation[index]
        const [[arra]] = await  connection.query('select * from articles WHERE id = ?', [element.idArtilce])
        array.push(arra)
    }
    return [array,comprobation]
}

const getTradingSeller = async ({idUser}) => {
    const [comprobation] = await  connection.query('select * from trading_user WHERE sellerId = ?', [idUser])
    if (!comprobation) return
    const array = []
    for (let index = 0; index < comprobation.length; index++) {
        const element = comprobation[index]
        const [[arra]] = await  connection.query('select * from articles WHERE id = ?', [element.idArtilce])
        array.push(arra)
    }
    return [array,comprobation]
}
const postVotedBoolean = async ({ idUser, idSeller, articleId }) => {
    const [[{voted}]] = await  connection.query('select voted from trading_user WHERE idArtilce = ? AND buyerId = ? AND sellerId = ?', [articleId, idUser, idSeller])
    if (voted !== null) return
    const res = await connection.query('UPDATE trading_user SET voted = 1 WHERE idArtilce = ? and sellerId = ? and buyerId = ?', [ articleId, idSeller, idUser])
    return res[0].affectedRows
}

module.exports = {
    postTrading,
    postTradingSeller,
    getTradingBuyer,
    getTradingSeller,
    postVotedBoolean
}