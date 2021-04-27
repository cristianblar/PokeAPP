/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import swal from 'sweetalert';

import styles from './PokemonDetail.module.sass';

import { API_URL } from '../../constants';
import { getPokemonByNameOrId, toggleLoading } from '../../store/actions/index';

import LoadingScreen from '../Loading/Loading';
import Layout from '../Layout/Layout';
import StatsCard from './StatsCard/StatsCard';
import TypesCard from './TypesCard/TypesCard';
import BackButton from '../BackButton/BackButton';

function PokemonDetail({
  idName,
  loading,
  error,
  pokemonDetail,
  getPokemonDetail,
  startLoading,
}) {
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    getPokemonDetail(idName);
  }, [idName, getPokemonDetail]);

  useEffect(() => {
    fetch(`${API_URL}/caught`)
      .then((response) => response.json())
      .then((responseInJson) => {
        setCaughtPokemons(responseInJson.results);
      })
      .catch(() => {
        setCaughtPokemons([]);
      });
  }, []);

  const catchPokemon = (id, imageUrl) => {
    if (imageUrl.endsWith('webp')) {
      // PATCH
      const patchBody = { id };
      const patchOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchBody),
      };
      swal({
        title: `Gotta catch em' all!`,
        text: `You're going to launch a Poké Ball to re-catch this created Pokémon, do you want to continue?`,
        icon: 'info',
        buttons: true,
      }).then((response) => {
        if (response) {
          startLoading();
          fetch(`${API_URL}/caught`, patchOptions)
            .then(() => {
              swal({
                title: 'Done!',
                text: 'The Pokémon is now part of your Caught Pokémon',
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
      // POST
      const postBody = { id };
      const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
      };
      swal({
        title: `Gotta catch em' all!`,
        text: `You're going to launch a Poké Ball to this Pokémon, do you want to continue?`,
        icon: 'info',
        buttons: true,
      }).then((response) => {
        if (response) {
          startLoading();
          fetch(`${API_URL}/caught`, postOptions)
            .then(() => {
              swal({
                title: 'Done!',
                text: 'The Pokémon is now part of your Caught Pokémon',
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

  const history = useHistory();

  if (error)
    return (
      <Layout>
        <img
          src="https://res.cloudinary.com/cristianblar/image/upload/v1619440623/sadPikachu_noDetail_vtsf0k.png"
          alt="Sad pikachu"
          width="195"
          height="176"
        />
        <p>No Pokémon around here 😞 Try another name!</p>
        <BackButton historyBack={history.goBack} />
      </Layout>
    );

  if (loading || !Object.keys(pokemonDetail).length)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <div>
          <h2>
            {`${pokemonDetail.name
              .charAt(0)
              .toUpperCase()}${pokemonDetail.name.substring(1)}`}{' '}
            (#{pokemonDetail.id})
          </h2>
          <img
            src={pokemonDetail.image_url}
            alt="Pokemon"
            width="280"
            height="280"
          />
        </div>
        {!caughtPokemons.filter(
          (pokemon) => pokemonDetail.id === pokemon.realId
        ).length ? (
          <button
            aria-label="Catch Pokémon"
            className={styles.catchButton}
            type="button"
            onClick={() =>
              catchPokemon(pokemonDetail.id, pokemonDetail.image_url)
            }
          />
        ) : (
          ''
        )}
        <StatsCard
          experience={pokemonDetail.experience}
          health={pokemonDetail.health}
          attack={pokemonDetail.attack}
          defense={pokemonDetail.defense}
          speed={pokemonDetail.speed}
        />
        <TypesCard
          id={pokemonDetail.id}
          types={pokemonDetail.types}
          height={pokemonDetail.height}
          weight={pokemonDetail.weight}
        />
      </div>

      <BackButton historyBack={history.goBack} />
    </Layout>
  );
}

PokemonDetail.propTypes = {
  idName: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  pokemonDetail: PropTypes.shape({
    attack: PropTypes.number,
    defense: PropTypes.number,
    experience: PropTypes.number,
    health: PropTypes.number,
    height: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image_url: PropTypes.string,
    name: PropTypes.string,
    speed: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    weight: PropTypes.number,
  }).isRequired,
  getPokemonDetail: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    error: state.error.status,
    pokemonDetail: state.currentPokemonDetail,
  };
}

const mapDispatchToProps = {
  getPokemonDetail: getPokemonByNameOrId,
  startLoading: toggleLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
