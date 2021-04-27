import React from 'react';
import PropTypes from 'prop-types';

import styles from './TypeFilter.module.sass';

function TypeFilter({ currentFilters, handleFilter }) {
  const toggleFilters = () => {
    const filtersModal = document.getElementById('filters-modal');
    if (filtersModal.classList.contains(styles.hideElement))
      filtersModal.classList.remove(styles.hideElement);
    else filtersModal.classList.add(styles.hideElement);
  };

  return (
    <>
      <button
        className={styles.openButton}
        type="button"
        onClick={toggleFilters}
      >
        Apply filters +
      </button>
      <div
        className={`${styles.mainContainer} ${styles.hideElement}`}
        id="filters-modal"
      >
        <div
          onChange={handleFilter}
          defaultChecked={currentFilters.pokemonType}
        >
          <h2>Pokémon type</h2>
          <div className={styles.labelsContainer}>
            <label htmlFor="type_all">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619138279/AddPokemon/pokemons_addpokemon_premmh.png"
                alt="All Pokémon"
                width="25"
                height="25"
              />{' '}
              ALL{' '}
              <input
                type="radio"
                name="pokemonType"
                id="type_all"
                defaultChecked
              />
            </label>
            <label htmlFor="type_normal">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/normal_type.png"
                alt="Normal Pokémon"
                width="25"
                height="25"
              />{' '}
              Normal <input type="radio" name="pokemonType" id="type_normal" />
            </label>
            <label htmlFor="type_fighting">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/fighting_type.png"
                alt="Fighting Pokémon"
                width="25"
                height="25"
              />{' '}
              Fighting{' '}
              <input type="radio" name="pokemonType" id="type_fighting" />
            </label>
            <label htmlFor="type_flying">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/flying_type.png"
                alt="Flying Pokémon"
                width="25"
                height="25"
              />{' '}
              Flying <input type="radio" name="pokemonType" id="type_flying" />
            </label>
            <label htmlFor="type_poison">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/poison_type.png"
                alt="Poison Pokémon"
                width="25"
                height="25"
              />{' '}
              Poison <input type="radio" name="pokemonType" id="type_poison" />
            </label>
            <label htmlFor="type_ground">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/ground_type.png"
                alt="Ground Pokémon"
                width="25"
                height="25"
              />{' '}
              Ground <input type="radio" name="pokemonType" id="type_ground" />
            </label>
            <label htmlFor="type_rock">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/rock_type.png"
                alt="Rock Pokémon"
                width="25"
                height="25"
              />{' '}
              Rock <input type="radio" name="pokemonType" id="type_rock" />
            </label>
            <label htmlFor="type_bug">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/bug_type.png"
                alt="Bug Pokémon"
                width="25"
                height="25"
              />{' '}
              Bug <input type="radio" name="pokemonType" id="type_bug" />
            </label>
            <label htmlFor="type_ghost">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/ghost_type.png"
                alt="Ghost Pokémon"
                width="25"
                height="25"
              />{' '}
              Ghost <input type="radio" name="pokemonType" id="type_ghost" />
            </label>
            <label htmlFor="type_steel">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/steel_type.png"
                alt="Steel Pokémon"
                width="25"
                height="25"
              />{' '}
              Steel <input type="radio" name="pokemonType" id="type_steel" />
            </label>
            <label htmlFor="type_fire">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/fire_type.png"
                alt="Fire Pokémon"
                width="25"
                height="25"
              />{' '}
              Fire <input type="radio" name="pokemonType" id="type_fire" />
            </label>
            <label htmlFor="type_water">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/water_type.png"
                alt="Water Pokémon"
                width="25"
                height="25"
              />{' '}
              Water <input type="radio" name="pokemonType" id="type_water" />
            </label>
            <label htmlFor="type_grass">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/grass_type.png"
                alt="Grass Pokémon"
                width="25"
                height="25"
              />{' '}
              Grass <input type="radio" name="pokemonType" id="type_grass" />
            </label>
            <label htmlFor="type_electric">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/electric_type.png"
                alt="Electric Pokémon"
                width="25"
                height="25"
              />{' '}
              Electric{' '}
              <input type="radio" name="pokemonType" id="type_electric" />
            </label>
            <label htmlFor="type_psychic">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/psychic_type.png"
                alt="Psychic Pokémon"
                width="25"
                height="25"
              />{' '}
              Psychic{' '}
              <input type="radio" name="pokemonType" id="type_psychic" />
            </label>
            <label htmlFor="type_ice">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/ice_type.png"
                alt="Ice Pokémon"
                width="25"
                height="25"
              />{' '}
              Ice <input type="radio" name="pokemonType" id="type_ice" />
            </label>
            <label htmlFor="type_dragon">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/dragon_type.png"
                alt="Dragon Pokémon"
                width="25"
                height="25"
              />{' '}
              Dragon <input type="radio" name="pokemonType" id="type_dragon" />
            </label>
            <label htmlFor="type_dark">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/dark_type.png"
                alt="Dark Pokémon"
                width="25"
                height="25"
              />{' '}
              Dark <input type="radio" name="pokemonType" id="type_dark" />
            </label>
            <label htmlFor="type_fairy">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619141376/Types/fairy_type.png"
                alt="Fairy Pokémon"
                width="25"
                height="25"
              />{' '}
              Fairy <input type="radio" name="pokemonType" id="type_fairy" />
            </label>
          </div>
        </div>
        <div onChange={handleFilter} defaultChecked={currentFilters.origin}>
          <h2>Origin</h2>
          <div className={styles.labelsContainer}>
            <label htmlFor="origin_all">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619138279/AddPokemon/pokemons_addpokemon_premmh.png"
                alt="All Pokémon"
                width="25"
                height="25"
              />
              ALL
              <input
                type="radio"
                name="origin"
                id="origin_all"
                defaultChecked
              />
            </label>
            <label htmlFor="origin_created">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619273470/Types/created.png"
                alt="Created Pokémon"
                width="25"
                height="25"
              />
              Created <input type="radio" name="origin" id="origin_created" />
            </label>
            <label htmlFor="origin_genuine">
              <img
                src="https://res.cloudinary.com/cristianblar/image/upload/v1619273470/Types/original.png"
                alt="Genuine Pokémon"
                width="25"
                height="25"
              />
              Genuine <input type="radio" name="origin" id="origin_genuine" />
            </label>
          </div>
        </div>
        <button
          className={styles.closeButton}
          type="button"
          onClick={toggleFilters}
        >
          Apply filters
        </button>
      </div>
    </>
  );
}

TypeFilter.propTypes = {
  currentFilters: PropTypes.shape({
    pokemonType: PropTypes.string,
    origin: PropTypes.string,
  }).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default TypeFilter;
