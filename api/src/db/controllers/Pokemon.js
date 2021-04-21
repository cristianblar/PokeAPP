/* eslint-disable no-restricted-syntax */

module.exports = {
  addPokemonToDb: (model) => async (pokemon) => {
    try {
      const createdPokemon = await model.create(pokemon);
      return createdPokemon;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPokemonByIdFromDb: (pokemonModel, typeModel) => async (pokemonId) => {
    try {
      const foundPokemon = await pokemonModel.findByPk(pokemonId, {
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      return foundPokemon;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPokemonByNameFromDb: (pokemonModel, typeModel) => async (pokemonName) => {
    try {
      const foundPokemon = await pokemonModel.findOne({
        where: { name: pokemonName },
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      return foundPokemon;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAllPokemonsFromDb: (pokemonModel, typeModel) => async () => {
    try {
      const foundPokemons = await pokemonModel.findAll({
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      return foundPokemons;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  toggleCaughtStatusInDb: (model) => async (pokemonId) => {
    try {
      const target = await model.findByPk(pokemonId);
      if (!target) return null;
      const currentStatus = target.getDataValue('caught');
      if (currentStatus) {
        target.caught = false;
        await target.save();
        return true;
      }
      target.caught = true;
      await target.save();
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAllCaughtPokemonsFromDb: (pokemonModel, typeModel) => async () => {
    try {
      const foundPokemons = await pokemonModel.findAll({
        where: { caught: true },
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      return foundPokemons;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deletePokemonFromDb: (model) => async (pokemonId) => {
    try {
      const foundPokemon = await model.findByPk(pokemonId);
      return foundPokemon ? await foundPokemon.destroy() : null;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteAllPokemonsFromDb: (model) => async () => {
    try {
      const foundPokemons = await model.findAll({
        where: { realId: null },
      });
      if (!foundPokemons.length) return null;
      const destroyPromises = [];
      // eslint-disable-next-line prefer-const
      for (let pokemon of foundPokemons) {
        destroyPromises.push(pokemon.destroy());
      }
      await Promise.all(destroyPromises);
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
