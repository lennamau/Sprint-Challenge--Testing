const db = require('../data/dbConfig.js')

module.exports = {
    insert, 
    getAll,
    getGame,
    remove
}

async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games').where({id}).first()
}

function getAll() {
    return db('games')
}

function getGame(id) {
    return db('games')
    .where({ id: id })
    .first()
}

function remove(id) {
    return db('games').del().where({id})
}