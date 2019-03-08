const db = require('../data/dbConfig.js')

module.exports = {
    insert, 
    getAll,
    getGameById,
    remove
}

async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games').where({id}).first()
}

function getAll() {
    return db('games')
}

function getGameById(id) {
    return db('games')
    .where({ id: id })
    .first()
}

function remove(id) {
    return db('games').del(id).where({id}, id)
}