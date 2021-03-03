/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { jsx, css } from '@emotion/react';
import localforage from 'localforage';
import { GET_LIST_POKEMON } from '../../GraphQL/Queries';
import {
  Navbar, Layout, Card, Loading, Button,
} from '../../components';

const ListPokemon = () => {
  const [items, setItems] = useState([]);
  const [ownedTotal, setOwnedTotal] = useState([]);
  const [state, setState] = useState({
    offset: 0,
    limit: 20,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await localforage.getItem('');
      setOwnedTotal(result);
    };
    fetchData();
  }, []);

  const { loading, error, refetch } = useQuery(GET_LIST_POKEMON, {
    variables: { ...state },
    onCompleted: (res) => {
      const { results } = res.pokemons;
      setItems(results);
    },
    onError: (e) => {
      throw e;
    },
  });

  const handleNextResult = () => {
    setState({
      ...state,
      limit: state.limit + 30,
    });
    refetch();
  };

  const renderListPokemon = () => (
    <>
      {error && `Error! ${error.message}`}
      {!error && (
        <>
          <Layout>
            {items.map((pokemon, key) => (
              <Card
                rounded="rounded"
                elevated="eleveated"
                css={css`
                  width: 170px;
                  height: 170px;
                `}
                key={key}
                id={key + 1}
                name={pokemon.name}
                urlImg={pokemon.image}
                ownedTotal={ownedTotal}
                isDetail={false}
                myPokemon={false}
              />
            ))}
          </Layout>
        </>
      )}
    </>
  );

  return (
    <>
      <Navbar title="React Pokédex" />
      <div css={{ marginTop: '1rem' }}>
        <div css={css`
          display: flex;
          justify-content: center;
          flex-flow: wrap;
          margin-left: 3rem;
          margin-right: 3rem;
        `}
        />
        <div css={css`
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          width: 100vw;
          max-width: 100vw;
        `}
        >
          {renderListPokemon()}
        </div>
        {loading && <Loading />}
        {!loading && (
          <div css={css`
            display: flex;
            justify-content: center;
            margin-top: 1rem;
          `}
          >
            <Button
              onClick={handleNextResult}
              css={css`
              border-radius: 5px;
              background-color: #03ac0d;
              color: #fff;
              border: none;
              `}
              text="Show more Pokémon"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListPokemon;
