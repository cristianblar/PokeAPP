import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';

import styles from './PokemonCards.module.sass';

import { API_URL } from '../../constants';
import { toggleLoading } from '../../store/actions/index';

import PokemonCard from './PokemonCard/PokemonCard';

function PokemonCards({ currentPokemons }) {
  const startLoading = useDispatch();
  const history = useHistory();

  const deleteCreatedPokemon = (id) => {
    const deleteBody = { id };
    const deleteOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deleteBody),
    };
    swal({
      title: 'Are you sure?',
      text: 'This action will delete this Pokémon forever 😢',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((response) => {
      if (response) {
        startLoading(toggleLoading());
        fetch(`${API_URL}/pokemons`, deleteOptions)
          .then(() => {
            swal({
              title: 'Done!',
              text: 'The Pokémon was deleted',
              icon: 'success',
            }).then(() => history.go('0'));
          })
          .catch(
            swal({
              title: 'Something went wrong...',
              text: 'Please, try again later',
              icon: 'info',
            })
          );
      }
    });
  };

  const uncatchPokemon = (id, realId) => {
    if (id === realId) {
      // PATCH
      const patchBody = { id };
      const patchOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchBody),
      };
      swal({
        title: 'Do you want to set your Pokémon free?',
        text:
          'This action will liberate your created Pokémon and you will have to catch him again (the Pokémon will not be erased from the existing Pokémon list)',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((response) => {
        if (response) {
          startLoading(toggleLoading());
          fetch(`${API_URL}/caught`, patchOptions)
            .then(() => {
              swal({
                title: 'Done!',
                text: 'The Pokémon is free now',
                icon: 'success',
              }).then(() => history.go('0'));
            })
            .catch(
              swal({
                title: 'Something went wrong...',
                text: 'Please, try again later',
                icon: 'info',
              })
            );
        }
      });
    } else {
      // DELETE
      const deleteBody = { id, realId };
      const deleteOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteBody),
      };
      swal({
        title: 'Do you want to set this Pokémon free?',
        text:
          'This action will liberate the Pokémon and you will have to catch him again',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((response) => {
        if (response) {
          startLoading(toggleLoading());
          fetch(`${API_URL}/caught`, deleteOptions)
            .then(() => {
              swal({
                title: 'Done!',
                text: 'The Pokémon is free now',
                icon: 'success',
              }).then(() => history.go('0'));
            })
            .catch(
              swal({
                title: 'Something went wrong...',
                text: 'Please, try again later',
                icon: 'info',
              })
            );
        }
      });
    }
  };

  return (
    <section className={styles.mainContainer}>
      <ul>
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.image_url.endsWith('webp') ? (
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => deleteCreatedPokemon(pokemon.id)}
              >
                X
              </button>
            ) : (
              ''
            )}
            {pokemon.realId ? (
              <button
                aria-label="Uncatch"
                className={styles.uncatchButton}
                type="button"
                onClick={() => uncatchPokemon(pokemon.id, pokemon.realId)}
              />
            ) : (
              ''
            )}
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </section>
  );
}

PokemonCards.propTypes = {
  currentPokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      realId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      image_url: PropTypes.string,
      name: PropTypes.string,
      types: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default PokemonCards;
