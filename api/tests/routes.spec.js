const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../src/app');
const { Pokemon, addTypesToDb, conn } = require('../src/db/index');

const agent = session(app);
const pokemon = {
  name: 'cristian',
};

describe('Type routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  before(() => conn.sync({ force: true }).then(() => addTypesToDb()));
  describe('GET /types', () => {
    it('should get 200', () => agent.get('/types').expect(200));
    it('should get an array of 20 types', () =>
      agent
        .get('/types')
        .then((res) => expect(res.body.results).to.have.lengthOf(20)));
    it('should get an array of 20 types', () =>
      agent
        .get('/types')
        .then((res) => expect(res.body.results).to.have.lengthOf(20)));
  });
  describe('GET /types/:typeName', () => {
    it('should get 200', () => agent.get('/types/electric').expect(200));
    it('should get a list with electric pokemons', () =>
      agent.get('/types/electric').then((res) => {
        expect(res.body.results[0].types).to.include('electric');
        expect(res.body.results[res.body.results.length - 1].types).to.include(
          'electric'
        );
      }));
  });
});

describe('Pokemon routes', () => {
  beforeEach(() =>
    conn.sync({ force: true }).then(() => {
      addTypesToDb();
      Pokemon.create(pokemon);
    })
  );
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
    it('should get 12 pokemons in results', () =>
      agent
        .get('/pokemons')
        .then((res) => expect(res.body.results).to.have.lengthOf(12)));
    it('should receive pagesInfo object for pagination information', () =>
      agent
        .get('/pokemons')
        .then((res) => expect(res.body).to.have.property('pagesInfo')));
    it('should get 40 or more pokemons in results with all query', () =>
      agent
        .get('/pokemons?all=true')
        .then((res) => expect(res.body.results).to.have.lengthOf.at.least(40)));
    it('returns pikachu details with query name', () =>
      agent
        .get('/pokemons?name=pikachu')
        .then((res) => expect(res.body.name).to.equal('pikachu')));
    it('returns personalized pokemon with query name', () =>
      agent
        .get('/pokemons?name=cristian')
        .then((res) => expect(res.body.name).to.equal('cristian')));
    it('returns charmander details with id 4', () =>
      agent
        .get('/pokemons/4')
        .then((res) => expect(res.body.name).to.equal('charmander')));
    it('returns personalized pokemon details with id', () =>
      agent
        .post('/pokemons')
        .send({ pokemon: { name: 'testie' } })
        .then((res1) => {
          agent
            .get(`/pokemons/${res1.body.id}`)
            .then((res2) => expect(res2.body.name).to.equal('testie'));
        }));
    it('POST should get 201', () =>
      agent
        .post('/pokemons')
        .send({ pokemon: { name: 'testie' } })
        .expect(201));
    it('adds personalized pokemon and returns its id', () =>
      agent
        .post('/pokemons')
        .send({ pokemon: { name: 'testie' } })
        .then((res) => expect(res.body).to.have.property('id')));
    it('deletes the personalized pokemons', () =>
      agent
        .delete('/pokemons')
        .send({ all: true })
        .then((res) => expect(res.text).to.equal('DONE')));
  });
});
