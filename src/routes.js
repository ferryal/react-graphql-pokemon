import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListPokemon from './schenes/List-Pokemon';
import PokemonDetail from './schenes/Pokemon-Detail';
import MyPokemon from './schenes/My-Pokemon';
import MyPokemonDetail from './schenes/My-Pokemon-Detail';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ListPokemon} />
    <Route path="/pokemon/:name" component={PokemonDetail} />
    <Route path="/my-pokemon" component={MyPokemon} />
    <Route path="/my-pokemon-detail/:name" component={MyPokemonDetail} />
    <Redirect to="/" />
  </Switch>
);

const HotApp = hot(Routes);
export { HotApp as Routes };
