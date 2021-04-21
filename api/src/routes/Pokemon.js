const { Router } = require('express');

const {
  addPokemon,
  getPokemons,
  getPokemonById,
  getPokemonByName,
  deleteCreatedPokemon,
  deleteAllCreatedPokemons,
} = require('../services/Pokemon');
const responseManager = require('./Response');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    // Si la ruta tiene name en el query:
    if (req.query.name) {
      responseManager(getPokemonByName, res, 200, [req.query.name]);
      // Si la ruta no tiene query, tiene query de paginado o para mostrar todo:
    } else {
      responseManager(getPokemons, res, 200, [req.query.page, req.query.all]);
    }
  })
  .post((req, res) => {
    // { pokemon: {...}, types: [] }
    responseManager(addPokemon, res, 201, [req.body.pokemon, req.body.types]);
  })
  .delete((req, res) => {
    if (req.body.id) {
      // { id: xxxx }
      responseManager(deleteCreatedPokemon, res, 200, [req.body.id]);
    } else if (req.body.all) {
      // { all: true }
      responseManager(deleteAllCreatedPokemons, res);
    } else {
      res.status(400).send(`Bad request! Missing body!`);
    }
  });

router.route('/:id').get((req, res) => {
  responseManager(getPokemonById, res, 200, [req.params.id]);
});

module.exports = router;
