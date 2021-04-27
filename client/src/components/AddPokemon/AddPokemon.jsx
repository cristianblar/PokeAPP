/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';

import styles from './AddPokemon.module.sass';

import LoadingScreen from '../Loading/Loading';
import Layout from '../Layout/Layout';
import BackButton from '../BackButton/BackButton';

import { API_URL } from '../../constants';

export default function AddPokemon() {
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: '',
    experience: 0,
    health: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: {
      form_normal: false,
      form_fighting: false,
      form_flying: false,
      form_poison: false,
      form_ground: false,
      form_rock: false,
      form_bug: false,
      form_ghost: false,
      form_steel: false,
      form_fire: false,
      form_water: false,
      form_grass: false,
      form_electric: false,
      form_psychic: false,
      form_ice: false,
      form_dragon: false,
      form_dark: false,
      form_fairy: false,
    },
  };

  const [formData, setFormData] = useState(initialState);

  const history = useHistory();

  const handleFormChange = (event) => {
    if (event.target.type === 'checkbox') {
      setFormData((currentState) => ({
        ...currentState,
        types: {
          ...currentState.types,
          [event.target.name]: !currentState.types[event.target.name],
        },
      }));
    } else {
      setFormData((currentState) => ({
        ...currentState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const typesArray = Object.entries(formData.types)
      .filter((arreglo1) => arreglo1[1] === true)
      .map((arreglo2) => arreglo2[0].substring(5));
    if (!typesArray.length)
      return swal(
        'Type(s) required',
        'You must select at least one type',
        'error'
      );
    const postBody = {
      pokemon: {
        name: formData.name.trim().toLowerCase(),
        experience: formData.experience,
        health: formData.health ? parseInt(formData.health, 10) : null,
        attack: formData.attack ? parseInt(formData.attack, 10) : null,
        defense: formData.defense ? parseInt(formData.defense, 10) : null,
        speed: formData.speed ? parseInt(formData.speed, 10) : null,
        height: formData.height ? parseInt(formData.height, 10) : null,
        weight: formData.weight ? parseInt(formData.weight, 10) : null,
      },
      types: typesArray,
    };
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    };
    setLoading(true);
    return fetch(`${API_URL}/pokemons`, postOptions)
      .then((result) => result.json())
      .then((resultInJson) => {
        setLoading(false);
        setFormData(initialState);
        swal({
          title: 'Pokemon has been created!',
          icon: 'success',
          button: `Let's see it!`,
        }).then(history.push(`/pokemons/${resultInJson.id}`));
      })
      .catch(() => {
        swal(
          'Something went wrong',
          'Please, try again with another name!',
          'warning'
        );
        setLoading(false);
      });
  };

  if (loading)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="form_name">
            <span>
              Which will be the <strong>name</strong> of your Pokémon?
            </span>
            <input
              required
              id="form_name"
              name="name"
              type="text"
              value={formData.name.trim()}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_health">
            <span>Health points?</span>
            <input
              type="number"
              name="health"
              id="form_health"
              value={formData.health}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_attack">
            <span>Attack points?</span>
            <input
              type="number"
              name="attack"
              id="form_attack"
              value={formData.attack}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_defense">
            <span>Defense points?</span>
            <input
              type="number"
              name="defense"
              id="form_defense"
              value={formData.defense}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_speed">
            <span>Speed points?</span>
            <input
              type="number"
              name="speed"
              id="form_speed"
              value={formData.speed}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_height">
            <span>Height points? (centimetres)</span>
            <input
              type="number"
              name="height"
              id="form_height"
              value={formData.height}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="form_weight">
            <span>Weight points? (grams)</span>
            <input
              type="number"
              name="weight"
              id="form_weight"
              value={formData.weight}
              onChange={handleFormChange}
            />
          </label>
          <span>Choose 1 or more types!</span>
          <div className={styles.labelsContainer}>
            {Object.keys(formData.types).map((key, index) => (
              <label key={index} htmlFor={key}>
                <img
                  src={`https://res.cloudinary.com/cristianblar/image/upload/v1619141377/Types/${key.substring(
                    5
                  )}_type.png`}
                  alt="Pokémon Type"
                  width="25"
                  height="25"
                />
                {` ${key.substring(5)} `}
                <input
                  type="checkbox"
                  key={key}
                  name={key}
                  id={key}
                  checked={formData.types[key]}
                  onChange={handleFormChange}
                />
              </label>
            ))}
          </div>
          <button className={styles.addButton} type="submit">
            Add!
          </button>
        </form>
      </div>
      {history ? <BackButton historyBack={history.goBack} /> : ''}
    </Layout>
  );
}
