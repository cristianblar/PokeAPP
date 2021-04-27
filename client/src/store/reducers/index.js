/* eslint-disable no-case-declarations */
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
} from '../actions/actionTypes';

import { MAX_POKEMON_PAGE } from '../../constants';

export default function reducer(state, action) {
  switch (action.type) {
    case HANDLE_ERROR:
      if (action.payload === 'remove')
        return {
          ...state,
          error: {
            status: false,
            message: 'error removed',
          },
        };
      return {
        ...state,
        error: {
          status: true,
          message: action.payload.message,
        },
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case GET_PAGINATED_POKEMONS:
      return {
        ...state,
        currentPokemons: action.payload.results,
        pages: action.payload.pagesInfo.totalPages,
        loading: false,
      };
    case CHANGE_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pages: Math.ceil(action.payload.length / MAX_POKEMON_PAGE),
      };
    case CHANGE_CURRENT_POKEMONS:
      return {
        ...state,
        currentPokemons: state.allPokemons.slice(
          action.payload * MAX_POKEMON_PAGE - MAX_POKEMON_PAGE,
          action.payload * MAX_POKEMON_PAGE
        ),
        currentPage: action.payload,
        loading: false,
      };
    case SORT_BY_ID:
      const pokemonsSortedById = state.allPokemons.sort((a, b) => a.id - b.id);
      return {
        ...state,
        allPokemons: pokemonsSortedById,
        currentPokemons: pokemonsSortedById.slice(0, MAX_POKEMON_PAGE),
        currentPage: 1,
      };
    case SORT_BY_NAME_ASC:
      const pokemonsSortedByNameASC = state.allPokemons.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return {
        ...state,
        allPokemons: pokemonsSortedByNameASC,
        currentPokemons: pokemonsSortedByNameASC.slice(0, MAX_POKEMON_PAGE),
        currentPage: 1,
      };
    case SORT_BY_NAME_DESC:
      const pokemonsSortedByNameDESC = state.allPokemons.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      return {
        ...state,
        allPokemons: pokemonsSortedByNameDESC,
        currentPokemons: pokemonsSortedByNameDESC.slice(0, MAX_POKEMON_PAGE),
        currentPage: 1,
      };
    case SORT_BY_POINTS:
      return {
        ...state,
        allPokemons: action.payload.allPokemons,
        currentPokemons: action.payload.allPokemons.slice(0, MAX_POKEMON_PAGE),
        currentPage: 1,
        loading: false,
      };
    case GET_POKEMON_BY_ID_NAME:
      return {
        ...state,
        currentPokemonDetail: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
