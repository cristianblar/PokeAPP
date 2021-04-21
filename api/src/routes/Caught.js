const { Router } = require('express');

const {
  getCaughtPokemons,
  catchAPIPokemon,
  uncatchAPIPokemon,
  toggleCaughtPokemon,
} = require('../services/Pokemon');
const responseManager = require('./Response');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    responseManager(getCaughtPokemons, res);
  })
  .post((req, res) => {
    // { id: xxxx }  =>  Solo se usa para "ATRAPAR" API pokemons
    responseManager(catchAPIPokemon, res, 201, [req.body.id]);
  })
  .patch((req, res) => {
    // { id: xxxx }  =>  Solo se usa para created pokemons
    responseManager(toggleCaughtPokemon, res, 200, [req.body.id]);
  })
  .delete((req, res) => {
    // { realId: xxxx, id: xxxx }  =>  Solo se usa para API pokemons "ATRAPADOS"
    responseManager(uncatchAPIPokemon, res, 200, [
      req.body.realId,
      req.body.id,
    ]);
  });

module.exports = router;
