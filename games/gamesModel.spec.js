const Games = require('./gamesModel')
const db = require('../data/dbConfig')

describe('Games Model', () => {
    // afterEach(async () => {
    //     await db('games').truncate();
    //   });
      it('should insert new game into the db', async () => {
        let game = await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980  });
        expect(game.title).toBe('Pacman');
        expect(game.genre).toBe('Arcade')
        expect(game.releaseYear).toBe(1980)

        // game = await Games.insert({ title: 'Just Dance', genre: 'Dance', releaseYear: 2012  });
        // expect(game.title).toBe('Just Dance');
        // expect(game.genre).toBe('Dance')
        // expect(game.releaseYear).toBe(2012)
      });

      it('should get all games', async () => {
        const list = await Games.getAll();
        expect(list.length).toBe(1);
    })
    it('should get game by id', async () => {
        const id = await Games.getGameById(1);
        expect(id.title).toBe('Pacman')
    })
    it('should delete a game', async () => {
        const delGame = await Games.remove(1)
        expect(delGame).toBe(1)
    })
    
})
