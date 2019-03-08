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

        const body = {
            title: 'Just Dance',
            genre: 'Dance',
            releaseDate: 2012
        }
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(201);
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

