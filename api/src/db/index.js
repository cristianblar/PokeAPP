/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const typeControllers = require('./controllers/Type');
const pokemonControllers = require('./controllers/Pokemon');
const { DB_URL } = require('../../constants');

const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

/* * RELACIONES * */
Pokemon.belongsToMany(Type, { through: 'pokemon_types', timestamps: false });
Type.belongsToMany(Pokemon, { through: 'pokemon_types', timestamps: false });

// Inyectamos los modelos a los controllers para luego exportar todo desde el index:
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Pokemon, Type } = require('./index.js');
  conn: sequelize, // para importar la conexión { conn } = require('./index.js');
  // Type controllers:
  addTypesToDb: typeControllers.addTypesToDb(Type),
  getAllTypesFromDb: typeControllers.getAllTypesFromDb,
  getPokemonsOfTypeFromDb: typeControllers.getPokemonsOfTypeFromDb(
    Type,
    Pokemon
  ),
  // Pokemon controllers:
  addPokemonToDb: pokemonControllers.addPokemonToDb(Pokemon),
  assignTypeToPokemonInDb: typeControllers.assignTypeToPokemonInDb,
  assignTypesToPokemonInDb: typeControllers.assignTypesToPokemonInDb,
  getAllPokemonsFromDb: pokemonControllers.getAllPokemonsFromDb(Pokemon, Type),
  getPokemonByIdFromDb: pokemonControllers.getPokemonByIdFromDb(Pokemon, Type),
  getPokemonByNameFromDb: pokemonControllers.getPokemonByNameFromDb(
    Pokemon,
    Type
  ),
  toggleCaughtStatusInDb: pokemonControllers.toggleCaughtStatusInDb(Pokemon),
  getAllCaughtPokemonsFromDb: pokemonControllers.getAllCaughtPokemonsFromDb(
    Pokemon,
    Type
  ),
  deletePokemonFromDb: pokemonControllers.deletePokemonFromDb(Pokemon),
  deleteAllPokemonsFromDb: pokemonControllers.deleteAllPokemonsFromDb(Pokemon),
};
