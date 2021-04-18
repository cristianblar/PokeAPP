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

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type, { through: 'pokemon_types', timestamps: false });
Type.belongsToMany(Pokemon, { through: 'pokemon_types', timestamps: false });

// Inyectamos los modelos a los controllers para luego exportarlos desde aquí:
const addTypesToDb = typeControllers.addTypesToDb(Type);
const getPokemonsOfType = typeControllers.getPokemonsOfType(Type, Pokemon);
const addPokemonToDb = pokemonControllers.addPokemonToDb(Pokemon);
const getAllPokemonsFromDb = pokemonControllers.getAllPokemonsFromDb(
  Pokemon,
  Type
);
const getPokemonByIdFromDb = pokemonControllers.getPokemonByIdFromDb(
  Pokemon,
  Type
);
const getPokemonByNameFromDb = pokemonControllers.getPokemonByNameFromDb(
  Pokemon,
  Type
);
const toggleCaughtStatusInDb = pokemonControllers.toggleCaughtStatusInDb(
  Pokemon
);
const getAllCaughtPokemonsFromDb = pokemonControllers.getAllCaughtPokemonsFromDb(
  Pokemon,
  Type
);
const deletePokemonFromDb = pokemonControllers.deletePokemonFromDb(Pokemon);
const deleteAllPokemonsFromDb = pokemonControllers.deleteAllPokemonsFromDb(
  Pokemon
);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  // Type controllers:
  addTypesToDb,
  getAllTypesFromDb: typeControllers.getAllTypesFromDb,
  getPokemonsOfType,
  addPokemonToDb,
  getAllPokemonsFromDb,
  getPokemonByIdFromDb,
  getPokemonByNameFromDb,
  assignTypeToPokemon: typeControllers.assignTypeToPokemon,
  assignTypesToPokemon: typeControllers.assignTypesToPokemon,
  getAllCaughtPokemonsFromDb,
  toggleCaughtStatusInDb,
  deletePokemonFromDb,
  deleteAllPokemonsFromDb,
};
