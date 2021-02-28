import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Routes } from './routes';
import * as serviceWorker from './serviceWorker';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>

);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

serviceWorker.unregister();
