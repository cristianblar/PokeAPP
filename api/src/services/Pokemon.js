const fetch = require('node-fetch');

const { API_URL, BACKEND_HOST, NEW_IMG_URL } = require('../../constants');
const {
  addPokemonToDb,
  assignTypeToPokemonInDb,
  assignTypesToPokemonInDb,
  getAllPokemonsFromDb,
  getPokemonByIdFromDb,
  getPokemonByNameFromDb,
  getAllCaughtPokemonsFromDb,
  toggleCaughtStatusInDb,
  deletePokemonFromDb,
  deleteAllPokemonsFromDb,
} = require('../db/index');

const MAX_POKEMON_PAGE = 12; // For main route requirement

module.exports = {
  getPokemons: async (page, all) => {
    try {
      const apiResponse = await fetch(`${API_URL}/pokemon?limit=40`);
      const apiResponseInJson = await apiResponse.json();
      // Segundo fetch para traer info de los pokemones:
      const apiPokemonFetchPromises = await Promise.all(
        apiResponseInJson.results.map((pokemon) => fetch(pokemon.url))
      );
      // Lista general de 40 pokemones:
      const apiPokemonsList = await Promise.all(
        apiPokemonFetchPromises.map((pokemonDetail) => pokemonDetail.json())
      );
      const dbResponse = await getAllPokemonsFromDb();
      // Lista general de 40 Pokemones + Pokemones creados:
      const fullPokemonsList = apiPokemonsList
        .concat(dbResponse)
        // Filtro para sacar pokemones ATRAPADOS y evitar duplicados:
        .filter(
          (pokemonDetail) =>
            typeof pokemonDetail.id === 'number' ||
            (pokemonDetail.id.length === 36 && !pokemonDetail.realId)
        )
        .map((pokemonDetail) => ({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          image_url:
            pokemonDetail.id.length === 36
              ? pokemonDetail.image_url
              : pokemonDetail.sprites.other['official-artwork'].front_default,
          types:
            pokemonDetail.id.length === 36
              ? pokemonDetail.types.map((typeObject) => typeObject.name)
              : pokemonDetail.types.map((type) => type.type.name),
        }));
      // If <all> query, NO paginar y devolver TODO:
      if (all) return fullPokemonsList;
      // Si no... PAGINACIÓN desde el BACKEND:
      const basicPagesInfo = {
        totalPokemonCount: fullPokemonsList.length,
        totalPages: Math.ceil(fullPokemonsList.length / MAX_POKEMON_PAGE),
      };
      const responsePages = [];
      // Si la cantidad de pokemones genera una única página:
      if (basicPagesInfo.totalPages === 1) {
        responsePages.push({
          pagesInfo: {
            ...basicPagesInfo,
            next: null,
            previous: null,
          },
          results: fullPokemonsList,
        });
      } else {
        // Si la cantidad de pokemones genera más de una página:
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= basicPagesInfo.totalPages; i++) {
          // Caso primera página:
          if (i === 1) {
            responsePages.push({
              pagesInfo: {
                ...basicPagesInfo,
                next: `${BACKEND_HOST}/pokemons?page=2`,
                previous: null,
              },
              results: fullPokemonsList.splice(0, 12),
            });
            // Caso última página:
          } else if (i === basicPagesInfo.totalPages) {
            responsePages.push({
              pagesInfo: {
                ...basicPagesInfo,
                next: null,
                previous: `${BACKEND_HOST}/pokemons?page=${i - 1}`,
              },
              results: fullPokemonsList.splice(0, fullPokemonsList.length),
            });
            // Caso página intermedia:
          } else {
            responsePages.push({
              pagesInfo: {
                ...basicPagesInfo,
                next: `${BACKEND_HOST}/pokemons?page=${i + 1}`,
                previous: `${BACKEND_HOST}/pokemons?page=${i - 1}`,
              },
              results: fullPokemonsList.splice(0, 12),
            });
          }
        }
      }
      // Si no hay query de page, o la query de page es 1:
      if (!page || page === 1) return responsePages[0];
      // Si la query de page supera la cantidad generada de pages:
      if (page > basicPagesInfo.totalPages)
        return responsePages[responsePages.length - 1];
      // Si la query hace match con alguna de las páginas generadas:
      return responsePages[page - 1];
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // Types must be an array
  addPokemon: async (pokemon, types) => {
    try {
      // El nombre del pokemon a agregar es obligatorio:
      if (!pokemon.name) throw new TypeError('The name is required');
      // Se estableció que el nombre sea único (en PokeAPI y en DB):
      const existingPokemonInDb = await getPokemonByNameFromDb(
        pokemon.name.trim().toLowerCase()
      );
      if (existingPokemonInDb)
        throw new TypeError('The Pokemon already exists');
      const existingPokemonInAPI = await fetch(
        `${API_URL}/pokemon/${pokemon.name.trim().toLowerCase()}`
      );
      if (existingPokemonInAPI.status === 200)
        throw new TypeError('The Pokemon already exists');
      const pokemonInfo = {
        realId: parseInt(pokemon.realId, 10) || null,
        name: pokemon.name.trim().toLowerCase(),
        image_url: pokemon.image_url || NEW_IMG_URL,
        caught: pokemon.caught || true,
        experience: parseInt(pokemon.experience, 10) || 0,
        health: parseInt(pokemon.health, 10) || null,
        attack: parseInt(pokemon.attack, 10) || null,
        defense: parseInt(pokemon.defense, 10) || null,
        speed: parseInt(pokemon.speed, 10) || null,
        height: parseInt(pokemon.height, 10) || null,
        weight: parseInt(pokemon.weight, 10) || null,
      };
      // Creación de pokemon en la DB:
      const pokemonInstance = await addPokemonToDb(pokemonInfo);
      // Asignación de types a través de la relación:
      // Si no se proveen types, se asigna 'unknown'...
      if (!types.length)
        await assignTypeToPokemonInDb(pokemonInstance, 'unknown');
      else if (types.length === 1)
        await assignTypeToPokemonInDb(
          pokemonInstance,
          types[0].trim().toLowerCase()
        );
      else
        await assignTypesToPokemonInDb(
          pokemonInstance,
          types.map((type) => type.trim().toLowerCase())
        );
      return {
        message: 'Pokemon has been created',
        id: pokemonInstance.getDataValue('id'),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPokemonById: async (id) => {
    try {
      if (id.length === 36) {
        // Pokemon de la DB...
        const dbPokemon = await getPokemonByIdFromDb(id);
        if (!dbPokemon) throw new TypeError(`The ID doesn't exist!`);
        const pokemonDetail = {
          name: dbPokemon.name,
          image_url: dbPokemon.image_url,
          types: dbPokemon.types.map((type) => type.name),
          id: dbPokemon.id,
          experience: dbPokemon.experience,
          health: dbPokemon.health,
          attack: dbPokemon.attack,
          defense: dbPokemon.defense,
          speed: dbPokemon.speed,
          height: dbPokemon.height,
          weight: dbPokemon.weight,
        };
        return pokemonDetail;
      }
      // Pokemon de la API...
      const normalizedId = parseInt(id, 10);
      if (!normalizedId) throw new TypeError(`Invalid ID`);
      const apiResponse = await fetch(`${API_URL}/pokemon/${normalizedId}`);
      if (apiResponse.status !== 200)
        throw new TypeError(`The ID doesn't exist!`);
      const apiResponseInJson = await apiResponse.json();
      const pokemonDetail = {
        name: apiResponseInJson.name,
        image_url:
          apiResponseInJson.sprites.other['official-artwork'].front_default,
        types: apiResponseInJson.types.map((type) => type.type.name),
        id: apiResponseInJson.id,
        experience: apiResponseInJson.base_experience,
        health: apiResponseInJson.stats[0].base_stat,
        attack: apiResponseInJson.stats[1].base_stat,
        defense: apiResponseInJson.stats[2].base_stat,
        speed: apiResponseInJson.stats[5].base_stat,
        height: apiResponseInJson.height,
        weight: apiResponseInJson.weight,
      };
      return pokemonDetail;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPokemonByName: async (name) => {
    try {
      const normalizedName = decodeURI(name).trim().toLowerCase();
      if (!normalizedName) throw new TypeError(`Invalid name`);
      // Pokemon de la API...
      const apiResponse = await fetch(`${API_URL}/pokemon/${normalizedName}`);
      if (apiResponse.status === 200) {
        const apiResponseInJson = await apiResponse.json();
        const pokemonDetail = {
          name: apiResponseInJson.name,
          image_url:
            apiResponseInJson.sprites.other['official-artwork'].front_default,
          types: apiResponseInJson.types.map((type) => type.type.name),
          id: apiResponseInJson.id,
          experience: apiResponseInJson.base_experience,
          health: apiResponseInJson.stats[0].base_stat,
          attack: apiResponseInJson.stats[1].base_stat,
          defense: apiResponseInJson.stats[2].base_stat,
          speed: apiResponseInJson.stats[5].base_stat,
          height: apiResponseInJson.height,
          weight: apiResponseInJson.weight,
        };
        return pokemonDetail;
      }
      // Pokemon de la DB...
      const dbPokemon = await getPokemonByNameFromDb(normalizedName);
      if (!dbPokemon) throw new TypeError(`The name doesn't exist!`);
      const pokemonDetail = {
        name: dbPokemon.name,
        image_url: dbPokemon.image_url,
        types: dbPokemon.types.map((type) => type.name),
        id: dbPokemon.id,
        experience: dbPokemon.experience,
        health: dbPokemon.health,
        attack: dbPokemon.attack,
        defense: dbPokemon.defense,
        speed: dbPokemon.speed,
        height: dbPokemon.height,
        weight: dbPokemon.weight,
      };
      return pokemonDetail;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  catchAPIPokemon: async (id) => {
    try {
      const normalizedId = parseInt(id, 10);
      // Debe ser un id válido para la PokeAPI
      if (!normalizedId) throw new TypeError(`Invalid ID for an API Pokemon`);
      const apiResponse = await fetch(`${API_URL}/pokemon/${normalizedId}`);
      if (apiResponse.status !== 200)
        throw new TypeError(`The ID doesn't exist!`);
      const apiResponseInJson = await apiResponse.json();
      const pokemonInfo = {
        realId: apiResponseInJson.id,
        name: apiResponseInJson.name.toLowerCase(),
        image_url:
          apiResponseInJson.sprites.other['official-artwork'].front_default,
        caught: true,
        experience: null,
        health: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
      };
      const pokemonInstance = await addPokemonToDb(pokemonInfo);
      if (apiResponseInJson.types.length === 1)
        await assignTypeToPokemonInDb(
          pokemonInstance,
          apiResponseInJson.types[0].type.name
        );
      else
        await assignTypesToPokemonInDb(
          pokemonInstance,
          apiResponseInJson.types.map((type) => type.type.name)
        );
      return {
        message: 'APIPokemon has been created in the DB as caught',
        id: pokemonInstance.getDataValue('id'),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  uncatchAPIPokemon: async (realId, id) => {
    try {
      if (!realId || !id) throw new TypeError(`Incomplete body request!`);
      if (realId === id)
        throw new TypeError(`Invalid route to liberate a created Pokemon`);
      const result = await deletePokemonFromDb(id);
      if (!result)
        throw new TypeError(
          `The ID doesn't exist or the pokemon is not caught`
        );
      return 'DONE';
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getCaughtPokemons: async () => {
    try {
      const dbResponse = await getAllCaughtPokemonsFromDb();
      if (!dbResponse.length) throw new TypeError(`No pokemons caught yet!`);
      const fullCaughtPokemonsList = dbResponse.map((pokemon) => ({
        id: pokemon.id,
        realId: pokemon.realId || pokemon.id,
        name: pokemon.name,
        image_url: pokemon.image_url,
        types: pokemon.types.map((typeObject) => typeObject.name),
      }));
      return fullCaughtPokemonsList;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  toggleCaughtPokemon: async (id) => {
    try {
      if (id.length !== 36)
        throw new TypeError(`Invalid ID... Created pokemon ID required`);
      const result = await toggleCaughtStatusInDb(id);
      if (!result) throw new TypeError(`The ID doesn't exist!`);
      return 'DONE';
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteCreatedPokemon: async (id) => {
    try {
      if (id.length !== 36)
        throw new TypeError(`Invalid ID... Created pokemon ID required`);
      const result = await deletePokemonFromDb(id);
      if (!result) throw new TypeError(`The ID doesn't exist!`);
      return 'DONE';
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteAllCreatedPokemons: async () => {
    try {
      const result = await deleteAllPokemonsFromDb();
      if (!result) throw new TypeError(`No created pokemons to delete!`);
      return 'DONE';
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
