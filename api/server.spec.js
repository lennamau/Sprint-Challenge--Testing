const request = require('supertest');
const Games = require('../games/gamesModel')
const server = require('./server.js');

const db = require('../data/dbConfig')

describe('Server Connection', () => {
    it('test server is responding', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200);
    });
    it('sends a response', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({api: 'running'})
    })

})
describe('Post Route', () => {
    it('responds with 201', async () => {
        const game = {
            title: 'NBA2K15',
            genre: 'Sports',
            releaseDate: 2015
        }
        const response = await request(server)
            .post('/games')
            .send(game);
        expect(response.status).toBe(201);
    })

    afterEach(async () => {
        await db('games').truncate();
    })
    it('responds with 405', async () => {

        const body = {
            title: 'Just Dance',
            genre: 'Dance',
            releaseDate: 2012
        }
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(405);
    })

    it('responds with 422', async () => {
        const title = {
            title: '',
            genre: 'Dance',
            releaseDate: 2012
        }
        const response = await request(server)
            .post('/games')
            .send(title);
        expect(response.status).toBe(422);
    })

})

describe('Get Route', () => {
    afterEach(async () => {
        await db('games').truncate();
    })
    it('responds with 200', async () => {
        const response = await request(server).get('/games')
        expect(response.status).toBe(200);
    });

    it('returns array of all games', async  () => {
        const fifa = {
            title: 'fifa',
            genre: 'sports',
            releaseYear: 2015
        }
        const mario = {
            title: 'mario',
            genre: 'arcade',
            releaseYear: 2014
        }
        await Games.insert([fifa, mario]);
        const getGames = await Games.getAll();
        expect(getGames.length).toBe(2);
    });

    it('returns empty array when no games', async () => {
        const response = await request(server).get('/games')
        expect(response.body).toEqual([]);
    });

})

describe('Delete route', () => {
    afterEach(async () => {
        await db('games').truncate();
    })
    it('responds with 200', async () => {
        const response = await request(server).remove('/games/1')
        expect(response.status).toBe(200)
    })
    it('responds with a 404', async () => {
        const response = await request(server).remove('/games/20')
        expect(response.status).toBe(404)
    })
  
})



