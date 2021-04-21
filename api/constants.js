require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const DB_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/pokemon`;
const API_URL = `https://pokeapi.co/api/v2`;
const NEW_IMG_URL = `https://res.cloudinary.com/cristianblar/image/upload/v1618532872/new-pokemon.jpg`;
const BACKEND_HOST = `http://localhost:3001`;

module.exports = {
  DB_URL,
  API_URL,
  NEW_IMG_URL,
  BACKEND_HOST,
};
