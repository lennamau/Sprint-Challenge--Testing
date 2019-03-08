const express = require('express');
const server = express()

const games = require('../games/gamesModel')

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'running' });
});


server.post('/games', async (req, res) => {
    const game = req.body;

    if (game.title) {
        await games.insert(game)
            .then(response => res.status(201).json(response))
            .catch(err => {
                res.status(405).json({
                    message: "This game already exists"
                })
            })
    }
    else {
        res.status(422).json({error: 'Info is missing'})
    }
})

server.get('/games', async (req, res) => {
    const list = await games.getAll();
    res.status(200).json(list);
})

server.delete('/games/:id', async (req, res) => {
    const { id } = req.params;
    await games.getGamesById(id)
        .then(game => {
            const newGame = game;
            games.remove(id)
                .then(response => {
                    if (response) {
                        res.status(200).json(newGame)
                    }
                    else {
                        res.status(404).json({message: 'that game is not here'})
                    }
                })
        })
        .catch(err => {
            res.status(500).json({error: 'error removing game'})
        })
})

module.exports = server;