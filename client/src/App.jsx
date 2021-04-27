import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import AllPokemons from './components/AllPokemons/AllPokemons';
import CaughtPokemons from './components/CaughtPokemons/CaughtPokemons';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import AddPokemon from './components/AddPokemon/AddPokemon';

import './App.sass';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/pokemons" component={AllPokemons} />
        <Route path="/caughtPokemons" component={CaughtPokemons} />
        <Route
          path="/pokemons/:idName"
          render={({ match }) => <PokemonDetail idName={match.params.idName} />}
        />
        <Route path="/addPokemon" component={AddPokemon} />
      </Switch>
    </>
  );
}

export default App;
