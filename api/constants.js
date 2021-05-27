const { DATABASE_URL, PORT: envPort } = process.env;

const PORT = envPort || 3001;
const DB_URL = DATABASE_URL;
const API_URL = `https://pokeapi.co/api/v2`;
const NEW_IMG_URL = `https://res.cloudinary.com/cristianblar/image/upload/v1619137420/AddPokemon/new-pokemon-conv_ba0fdx.webp`;
const BACKEND_HOST = `https://pokemon-app-back.herokuapp.com/`;

module.exports = {
  PORT,
  DB_URL,
  API_URL,
  NEW_IMG_URL,
  BACKEND_HOST,
};
