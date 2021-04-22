const { expect, assert } = require('chai');
const { Pokemon, Type, conn } = require('../src/db/index');

describe('Pokemon model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Cristian' });
      });
    });
    describe('id', () => {
      it('must assign UUIDV4 as id by default', () => {
        Pokemon.create({ name: 'Test' }).then((pokemon) => {
          expect(pokemon.id).to.be.a('string').with.lengthOf(36);
        });
      });
      it('should throw an error if id is passed as null', (done) => {
        Pokemon.create({ id: null, name: 'test' })
          .then(() => done(new Error('It requires a valid UUIDV4 id')))
          .catch(() => done());
      });
      it('2 pokemons must have different ids', () => {
        Pokemon.create({ name: 'test1' }).then((firstPokemon) => {
          Pokemon.create({ name: 'test2' }).then((secondPokemon) =>
            assert.notEqual(firstPokemon.id, secondPokemon.id)
          );
        });
      });
    });
    describe('points properties', () => {
      it(`should create a pokemon even if the points' properties are null`, () => {
        Pokemon.create({
          name: 'Test',
          experience: null,
          health: null,
          attack: null,
          defense: null,
          speed: null,
          height: null,
          weight: null,
        });
      });
      it('should throw an error if experience is passed as a string', (done) => {
        Pokemon.create({ name: 'test', experience: 'A lot!' })
          .then(() => done(new Error('It requires a number for experience')))
          .catch(() => done());
      });
      it('should throw an error if health is passed as a string', (done) => {
        Pokemon.create({ name: 'test', health: 'A lot!' })
          .then(() => done(new Error('It requires a number for health')))
          .catch(() => done());
      });
      it('should throw an error if attack is passed as a string', (done) => {
        Pokemon.create({ name: 'test', attack: 'A lot!' })
          .then(() => done(new Error('It requires a number for attack')))
          .catch(() => done());
      });
      it('should throw an error if defense is passed as a string', (done) => {
        Pokemon.create({ name: 'test', defense: 'A lot!' })
          .then(() => done(new Error('It requires a number for defense')))
          .catch(() => done());
      });
      it('should throw an error if speed is passed as a string', (done) => {
        Pokemon.create({ name: 'test', speed: 'A lot!' })
          .then(() => done(new Error('It requires a number for speed')))
          .catch(() => done());
      });
      it('should throw an error if height is passed as a string', (done) => {
        Pokemon.create({ name: 'test', height: 'A lot!' })
          .then(() => done(new Error('It requires a number for height')))
          .catch(() => done());
      });
      it('should throw an error if weight is passed as a string', (done) => {
        Pokemon.create({ name: 'test', weight: 'A lot!' })
          .then(() => done(new Error('It requires a number for weight')))
          .catch(() => done());
      });
    });
  });
});

describe('Type model', () => {
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('id', () => {
      it('should throw an error if id is passed as null', (done) => {
        Type.create({ id: null, name: 'test' })
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should throw an error if id is passed as string', (done) => {
        Type.create({ id: 'gigante', name: 'test' })
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
    });
  });
});
