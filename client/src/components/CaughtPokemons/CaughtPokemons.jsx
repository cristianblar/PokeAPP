import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './CaughtPokemons.module.sass';

import LoadingScreen from '../Loading/Loading';
import Layout from '../Layout/Layout';
import PokemonCards from '../PokemonCards/PokemonCards';
import BackButton from '../BackButton/BackButton';

import { API_URL } from '../../constants';

function CaughtPokemons() {
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    fetch(`${API_URL}/caught`)
      .then((response) => response.json())
      .then((responseInJson) => setCaughtPokemons(responseInJson.results))
      .then(setLoading(false))
      .catch(() => {
        setCaughtPokemons([]);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );

  if (!caughtPokemons.length && !loading)
    return (
      <Layout>
        <figure className={styles.imageContainer}>
          <img
            src="https://res.cloudinary.com/cristianblar/image/upload/v1619440623/sadPikachu_noDetail_vtsf0k.png"
            alt="Sad pikachu"
            width="195"
            height="176"
          />
        </figure>
        <h4 className={styles.emptyTitle}>
          There aren&rsquo;t Pokémon caught yet! Try to catch one with your
          pokeballs!
        </h4>
        <BackButton historyBack={history.goBack} />
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <PokemonCards currentPokemons={caughtPokemons} />
        <BackButton
          className={styles.lastButton}
          historyBack={history.goBack}
        />
      </div>
    </Layout>
  );
}

export default CaughtPokemons;
