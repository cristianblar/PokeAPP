/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './PokemonCard.module.sass';

function PokemonCard({ pokemon }) {
  return (
    <article className={styles.cardContainer}>
      <h4>{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.substring(
        1
      )}`}</h4>
      <Link to={`/pokemons/${pokemon.realId ? pokemon.realId : pokemon.id}`}>
        <img src={pokemon.image_url} alt="Pokemon" width="80" height="80" />
      </Link>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{`${type.charAt(0).toUpperCase()}${type.substring(
            1
          )}`}</li>
        ))}
      </ul>
    </article>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    realId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image_url: PropTypes.string,
    name: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PokemonCard;
