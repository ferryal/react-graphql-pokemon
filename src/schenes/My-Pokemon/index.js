/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { jsx, css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import {
  Card, Navbar, Layout, Button,
} from '../../components';

const MyPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await localforage.keys()
        .then((keys) => {
          const matches = [];
          for (const i in keys) {
            if (keys[i] !== '') {
              // matches will be an array of promises
              matches.push(localforage.getItem(keys[i]));
            }
          }
          // Promise.all returns a promise that resolves to an array
          // of the values they resolve to
          console.log(matches);
          return Promise.all(matches);
        })
        .then((values) => {
          // values is an array of your items
          setPokemonList(values);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar title="My Pokémon List" />
      {(pokemonList.length > 0) && (
        <Layout>
          {pokemonList.map((poke, key) => (
            <Card
              key={key}
              name={poke.nickname}
              urlImg={poke.data.pokemon.sprites.front_default}
              myPokemon
              rounded="rounded"
              elevated="eleveated"
              css={css`
                width: 200px;
                height: 200px;
                margin-top: 2rem;
              `}
            />
          ))}
        </Layout>
      )}
      {(pokemonList.length < 1) && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 10rem;
            flex-direction: column;
            align-items: center;
          `}
        >
          <p css={css`font-weight: bold; font-size: 30px;`}>Empty list...</p>
          <Button onClick={() => history.push('/')} text="Go to Pokémon List" />
        </div>
      )}

    </>
  );
};

export default MyPokemon;
