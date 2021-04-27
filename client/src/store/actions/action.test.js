import {
  toggleLoading,
  handleError,
  changeCurrentPokemons,
  getPokemonsByIdAsc,
  getPokemonsByNameAsc,
  getPokemonsByNameDesc,
} from './index';

describe('Action Creators', () => {
  it('Should have a toggle for the Redux loading status', () => {
    expect(toggleLoading()).toEqual({
      type: 'TOGGLE_LOADING',
    });
  });
  it('Should have an error handler which works without payload', () => {
    expect(handleError()).toEqual({
      type: 'HANDLE_ERROR',
    });
  });
  it('Should have an error handler which works with payload', () => {
    expect(handleError('remove')).toEqual({
      type: 'HANDLE_ERROR',
      payload: 'remove',
    });
  });
  it('Should have a changeCurrentPokemons method that receive a page number', () => {
    expect(changeCurrentPokemons(3)).toEqual({
      type: 'CHANGE_CURRENT_POKEMONS',
      payload: 3,
    });
  });
  it('Should have a getPokemonsByIdAsc sort method', () => {
    expect(getPokemonsByIdAsc()).toEqual({
      type: 'SORT_BY_ID',
    });
  });
  it('Should have a getPokemonsByNameAsc sort method', () => {
    expect(getPokemonsByNameAsc()).toEqual({
      type: 'SORT_BY_NAME_ASC',
    });
  });
  it('Should have a getPokemonsByNameDesc sort method', () => {
    expect(getPokemonsByNameDesc()).toEqual({
      type: 'SORT_BY_NAME_DESC',
    });
  });
});
