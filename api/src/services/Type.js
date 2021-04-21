const fetch = require('node-fetch');

const { API_URL } = require('../../constants');
const { getAllTypesFromDb, getPokemonsOfTypeFromDb } = require('../db/index');

module.exports = {
  getAllTypes: () => JSON.stringify(getAllTypesFromDb()),
  getPokemonsOfType: async (typeName) => {
    try {
      if (typeof typeName !== 'string') throw new TypeError('Invalid type');
      const normalizedTypeName = typeName.trim().toLowerCase();
      // Se consulta primero la DB para traer el id del type:
      const dbResponse = await getPokemonsOfTypeFromDb(normalizedTypeName);
      if (!dbResponse) throw new TypeError(`Type doesn't exist`);
      // Ahora sí se consulta la PokeAPI:
      const apiResponse = await fetch(`${API_URL}/type/${dbResponse.id}`);
      const apiResponseInJson = await apiResponse.json();
      // Se hace segundo fetch para traer info de los pokemones:
      const apiPokemonFetchPromises = await Promise.all(
        apiResponseInJson.pokemon
          .slice(0, 40)
          .map((pokemon) => fetch(pokemon.pokemon.url))
      );
      const apiPokemonsList = await Promise.all(
        apiPokemonFetchPromises.map((pokemonDetail) => pokemonDetail.json())
      );
      const fullPokemonsList = apiPokemonsList
        .concat(dbResponse.data)
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
      if (fullPokemonsList.length) return fullPokemonsList;
      return `Type doesn't have pokemons registered`;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
