/* eslint-disable no-restricted-syntax */

const { NEW_IMG_URL } = require('../../../constants');

module.exports = {
  // Requiere validación en el backend
  addPokemonToDb: (model) => async (pokemon) => {
    try {
      const createdPokemon = await model.create({
        name: pokemon.name.toLowerCase(),
        image_url: pokemon.image_url || NEW_IMG_URL,
        caught: pokemon.caught || true,
        experience: pokemon.experience || null,
        health: pokemon.health || null,
        attack: pokemon.attack || null,
        defense: pokemon.defense || null,
        speed: pokemon.speed || null,
        height: pokemon.height || null,
        weight: pokemon.weight || null,
      });
      return createdPokemon;
    } catch (error) {
      return new Error(error.message);
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
      return foundPokemon ? JSON.stringify(foundPokemon) : null;
    } catch (error) {
      return new Error(error.message);
    }
  },
  getPokemonByNameFromDb: (pokemonModel, typeModel) => async (pokemonName) => {
    try {
      const foundPokemon = await pokemonModel.findOne({
        where: { name: pokemonName.toLowerCase() },
        include: {
          model: typeModel,
          through: { attributes: [] },
        },
      });
      return foundPokemon ? JSON.stringify(foundPokemon) : null;
    } catch (error) {
      return new Error(error.message);
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
      return foundPokemons.length ? JSON.stringify(foundPokemons) : null;
    } catch (error) {
      return new Error(error.message);
    }
  },
  toggleCaughtStatusInDb: (model) => async (pokemonId) => {
    const target = await model.findByPk(pokemonId);
    if (!target) return null;
    const currentStatus = target.getDataValue('caught');
    if (currentStatus) {
      target.caught = false;
      await target.save();
      return 'Pokemon has been set free!';
    }
    target.caught = true;
    await target.save();
    return 'Pokemon caught!';
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
      return foundPokemons.length ? JSON.stringify(foundPokemons) : null;
    } catch (error) {
      return new Error(error.message);
    }
  },
  deletePokemonFromDb: (model) => async (pokemonId) => {
    try {
      const foundPokemon = await model.findByPk(pokemonId);
      return foundPokemon ? await foundPokemon.destroy() : null;
    } catch (error) {
      return new Error(error.message);
    }
  },
  deleteAllPokemonsFromDb: (model) => async () => {
    try {
      const foundPokemons = await model.findAll();
      if (!foundPokemons.length) return null;
      const destroyPromises = [];
      // eslint-disable-next-line prefer-const
      for (let pokemon of foundPokemons) {
        destroyPromises.push(pokemon.destroy());
      }
      await Promise.all(destroyPromises);
      return 'All Pokemons deleted!';
    } catch (error) {
      return new Error(error.message);
    }
  },
};
