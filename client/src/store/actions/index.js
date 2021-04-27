import {
  HANDLE_ERROR,
  TOGGLE_LOADING,
  GET_PAGINATED_POKEMONS,
  CHANGE_ALL_POKEMONS,
  CHANGE_CURRENT_POKEMONS,
  SORT_BY_ID,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SORT_BY_POINTS,
  GET_POKEMON_BY_ID_NAME,
} from './actionTypes';

import { API_URL } from '../../constants';

/* ACTION CREATORS */

// BASICS:
export function toggleLoading() {
  return { type: TOGGLE_LOADING };
}

export function handleError(payload) {
  return { type: HANDLE_ERROR, payload };
}

// Para la carga inicial:
export function getPaginatedPokemons(pageNumber) {
  return (dispatch) => {
    dispatch(toggleLoading());
    fetch(`${API_URL}/pokemons${pageNumber ? `?page=${pageNumber}` : ''}`)
      .then((rawData) => rawData.json())
      .then((data) => {
        dispatch({ type: GET_PAGINATED_POKEMONS, payload: data });
        if (!pageNumber)
          fetch(`${API_URL}/pokemons?all=true`)
            .then((rawData) => rawData.json())
            .then((allDataPreCharge) =>
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: allDataPreCharge.results,
              })
            )
            .catch((error) => dispatch(handleError(error)));
      })
      .catch((error) => dispatch(handleError(error)));
  };
}

// Updates a las listas AllPokemons y CurrentPokemons:
export function changeAllPokemons(filters) {
  return (dispatch) => {
    dispatch(toggleLoading());
    if (filters.pokemonType === 'all') {
      fetch(`${API_URL}/pokemons?all=true`)
        .then((rawData) => rawData.json())
        .then((data) => {
          switch (filters.origin) {
            case 'created':
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results.filter(
                  (pokemon) => pokemon.id.length === 36
                ),
              });
              break;
            case 'genuine':
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results.filter(
                  (pokemon) => pokemon.id.length !== 36
                ),
              });
              break;
            // "all" en origin
            default:
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results,
              });
              break;
          }
          dispatch(changeCurrentPokemons(1));
        })
        .catch((error) => dispatch(handleError(error)));
    } else {
      fetch(`${API_URL}/types/${filters.pokemonType}`)
        .then((rawData) => rawData.json())
        .then((data) => {
          switch (filters.origin) {
            case 'created':
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results.filter(
                  (pokemon) => pokemon.id.length === 36
                ),
              });
              break;
            case 'genuine':
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results.filter(
                  (pokemon) => pokemon.id.length !== 36
                ),
              });
              break;
            // "all" en origin
            default:
              dispatch({
                type: CHANGE_ALL_POKEMONS,
                payload: data.results,
              });
              break;
          }
          dispatch(changeCurrentPokemons(1));
        })
        .catch((error) => dispatch(handleError(error)));
    }
  };
}

export function changeCurrentPokemons(payload) {
  return { type: CHANGE_CURRENT_POKEMONS, payload };
}

// SORTS:
export function getPokemonsByIdAsc() {
  return { type: SORT_BY_ID };
}

export function getPokemonsByNameAsc() {
  return { type: SORT_BY_NAME_ASC };
}

export function getPokemonsByNameDesc() {
  return { type: SORT_BY_NAME_DESC };
}

export function getPokemonsByAttackAsc(currentPokemonsList) {
  return (dispatch) => {
    dispatch(toggleLoading());
    Promise.all(
      currentPokemonsList.map((pokemon) =>
        fetch(`${API_URL}/pokemons/${pokemon.id}`)
      )
    )
      .then((rawArray) =>
        Promise.all(rawArray.map((rawPokemon) => rawPokemon.json()))
      )
      .then((pokemonDetails) => {
        const allPokemons = pokemonDetails.sort((a, b) => a.attack - b.attack);
        const filteredDetails = allPokemons.map((pokemonDetail) => ({
          id: pokemonDetail.id,
          image_url: pokemonDetail.image_url,
          name: pokemonDetail.name,
          types: pokemonDetail.types,
        }));
        dispatch({
          type: SORT_BY_POINTS,
          payload: { allPokemons: filteredDetails },
        });
      })
      .catch((error) => dispatch(handleError(error)));
  };
}

export function getPokemonsByAttackDesc(currentPokemonsList) {
  return (dispatch) => {
    dispatch(toggleLoading());
    Promise.all(
      currentPokemonsList.map((pokemon) =>
        fetch(`${API_URL}/pokemons/${pokemon.id}`)
      )
    )
      .then((rawArray) =>
        Promise.all(rawArray.map((rawPokemon) => rawPokemon.json()))
      )
      .then((pokemonDetails) => {
        const allPokemons = pokemonDetails.sort((a, b) => b.attack - a.attack);
        const filteredDetails = allPokemons.map((pokemonDetail) => ({
          id: pokemonDetail.id,
          image_url: pokemonDetail.image_url,
          name: pokemonDetail.name,
          types: pokemonDetail.types,
        }));
        dispatch({
          type: SORT_BY_POINTS,
          payload: { allPokemons: filteredDetails },
        });
      })
      .catch((error) => dispatch(handleError(error)));
  };
}

export function getPokemonsByExperienceAsc(currentPokemonsList) {
  return (dispatch) => {
    dispatch(toggleLoading());
    Promise.all(
      currentPokemonsList.map((pokemon) =>
        fetch(`${API_URL}/pokemons/${pokemon.id}`)
      )
    )
      .then((rawArray) =>
        Promise.all(rawArray.map((rawPokemon) => rawPokemon.json()))
      )
      .then((pokemonDetails) => {
        const allPokemons = pokemonDetails.sort(
          (a, b) => a.experience - b.experience
        );
        const filteredDetails = allPokemons.map((pokemonDetail) => ({
          id: pokemonDetail.id,
          image_url: pokemonDetail.image_url,
          name: pokemonDetail.name,
          types: pokemonDetail.types,
        }));
        dispatch({
          type: SORT_BY_POINTS,
          payload: { allPokemons: filteredDetails },
        });
      })
      .catch((error) => dispatch(handleError(error)));
  };
}

export function getPokemonsByExperienceDesc(currentPokemonsList) {
  return (dispatch) => {
    dispatch(toggleLoading());
    Promise.all(
      currentPokemonsList.map((pokemon) =>
        fetch(`${API_URL}/pokemons/${pokemon.id}`)
      )
    )
      .then((rawArray) =>
        Promise.all(rawArray.map((rawPokemon) => rawPokemon.json()))
      )
      .then((pokemonDetails) => {
        const allPokemons = pokemonDetails.sort(
          (a, b) => b.experience - a.experience
        );
        const filteredDetails = allPokemons.map((pokemonDetail) => ({
          id: pokemonDetail.id,
          image_url: pokemonDetail.image_url,
          name: pokemonDetail.name,
          types: pokemonDetail.types,
        }));
        dispatch({
          type: SORT_BY_POINTS,
          payload: { allPokemons: filteredDetails },
        });
      })
      .catch((error) => dispatch(handleError(error)));
  };
}

// GET POKEMON DETAILS, BY NAME OR ID:
export function getPokemonByNameOrId(nameOrId) {
  return (dispatch) => {
    dispatch(toggleLoading());
    if (typeof nameOrId === 'number' || nameOrId.length === 36)
      fetch(`${API_URL}/pokemons/${nameOrId}`)
        .then((rawData) => rawData.json())
        .then((data) =>
          dispatch({ type: GET_POKEMON_BY_ID_NAME, payload: data })
        )
        .catch((error) => dispatch(handleError(error)));
    else
      fetch(`${API_URL}/pokemons?name=${nameOrId}`)
        .then((rawData) => rawData.json())
        .then((data) =>
          dispatch({ type: GET_POKEMON_BY_ID_NAME, payload: data })
        )
        .catch((error) => dispatch(handleError(error)));
  };
}
