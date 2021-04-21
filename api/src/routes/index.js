const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRouter = require('./Type');
const pokemonRouter = require('./Pokemon');
const caughtRouter = require('./Caught');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typeRouter);
router.use('/pokemons', pokemonRouter);
router.use('/caught', caughtRouter);

module.exports = router;
