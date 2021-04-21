const { Op } = require('sequelize');
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
      return Promise.reject(error);
    }
  },
  getAllTypesFromDb: () => typeInstances,
  assignTypeToPokemonInDb: async (pokemonInstance, pokemonType) => {
    try {
      const pokemonTypeInstance = typeInstances.filter(
        (typeInstance) => typeInstance.dataValues.name === pokemonType
      )[0];
      await pokemonInstance.addType(pokemonTypeInstance);
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // pokemonTypes must be an array of strings:
  assignTypesToPokemonInDb: async (pokemonInstance, pokemonTypes) => {
    try {
      const pokemonTypesInstances = typeInstances.filter((typeInstance) =>
        pokemonTypes.includes(typeInstance.dataValues.name)
      );
      await pokemonInstance.addTypes(pokemonTypesInstances);
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPokemonsOfTypeFromDb: (typeModel, pokemonModel) => async (typeName) => {
    try {
      const foundType = typeInstances.filter(
        (typeInstance) => typeInstance.dataValues.name === typeName
      )[0];
      if (!foundType) return null;
      const foundPokemons = await pokemonModel.findAll({
        include: {
          model: typeModel,
          where: { name: foundType.getDataValue('name') },
          through: { attributes: [] },
        },
      });
      /* La query anterior traerá todos los pokemones del type
        pero si el pokemon tiene más de 1 tipo, solo mostrará
        el type buscado. Se debe hacer una query adicional
        para traer los types de cada pokemon completos... */
      const foundPokemonsIds = foundPokemons.map((foundPokemon) =>
        foundPokemon.getDataValue('id')
      );
      const fixedFoundPokemons = await pokemonModel.findAll({
        where: { id: { [Op.in]: foundPokemonsIds } },
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      // Se retorna el id para ser utilizado luego al consultar la API
      return { data: fixedFoundPokemons, id: foundType.getDataValue('id') };
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
