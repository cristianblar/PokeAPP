import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const initialState = {
  loading: true,
  error: { status: false, message: undefined },
  allPokemons: [],
  currentPokemons: [],
  pages: 0,
  currentPage: 0,
  currentPokemonDetail: {},
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, initialState, composedEnhancer);

export default store;
