const fetch = require('node-fetch');
const { API_URL } = require('../../../constants');

let typeInstances = [];

module.exports = {
  addTypesToDb: (model) => async () => {
    try {
      // Traemos de la PokeApi la lista de types
      const typesResponse = await fetch(`${API_URL}/type`);
      const typesJson = await typesResponse.json();
      const typesArray = await typesJson.results;

      // Modificamos la respuesta y la dejamos lista para Bulk Creation:
      const typeRows = typesArray.map((type) => ({
        id: parseInt(type.url.split('/')[6], 10),
        name: type.name,
      }));
      // Inyectamos la data de los types a la base de datos:
      typeInstances = await model.bulkCreate(typeRows, { validate: true });
      return 'All the types have been added from the PokeAPI';
    } catch (error) {
      return new Error(error.message);
    }
  },
  getAllTypesFromDb: () => JSON.stringify(typeInstances),
  assignTypeToPokemon: async (pokemonInstance, pokemonType) => {
    try {
      const pokemonTypeInstance = typeInstances.filter(
        (typeInstance) =>
          typeInstance.dataValues.name === pokemonType.toLowerCase()
      )[0];
      await pokemonInstance.addType(pokemonTypeInstance);
      return 'Relation has been made!';
    } catch (error) {
      return new Error(error.message);
    }
  },
  // pokemonTypes must be an array of strings:
  assignTypesToPokemon: async (pokemonInstance, pokemonTypes) => {
    try {
      const normalizedPokemonTypes = pokemonTypes.map((pokemonType) =>
        pokemonType.toLowerCase()
      );
      const pokemonTypesInstances = typeInstances.filter((typeInstance) =>
        normalizedPokemonTypes.includes(typeInstance.dataValues.name)
      );
      await pokemonInstance.addTypes(pokemonTypesInstances);
      return 'Relations added!';
    } catch (error) {
      return new Error(error.message);
    }
  },
  getPokemonsOfType: (typeModel, pokemonModel) => async (typeName) => {
    try {
      const foundType = await typeModel.findOne({
        where: { name: typeName.toLowerCase() },
        include: {
          model: pokemonModel,
          through: { attributes: [] },
        },
      });
      return foundType ? JSON.stringify(foundType) : null;
    } catch (error) {
      return new Error(error.message);
    }
  },
};
