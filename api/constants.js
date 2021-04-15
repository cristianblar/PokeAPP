require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const DB_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/pokemon`;
const API_URL = `https://pokeapi.co/api/v2`;

module.exports = {
  DB_URL,
  API_URL,
};
