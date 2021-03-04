/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useParams, useHistory } from 'react-router-dom';
import { jsx, css, keyframes } from '@emotion/react';
import {
  Layout, Navbar, Button, Card, Badge, Loading,
} from '../../components';

const bounceAnimation = keyframes`
  0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
`;

const MyPokemonDetail = () => {
  const [detail, setDetail] = useState({ data: [] });
  const history = useHistory();
  const { name } = useParams();
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      const result = await localforage.getItem(name);
      setDetail(result);
    };
    fetchDetail();
  }, [name]);

  useEffect(() => {
    const fetchIds = async () => {
      const res = await localforage.getItem('');
      setRegisteredIds(res);
    };
    fetchIds();
  }, []);

  const updateRegisteredIds = () => {
    const tempIds = [...registeredIds];
    const index = tempIds.indexOf(detail.data.pokemon.id);
    if (index > -1) {
      tempIds.splice(index, 1);
    }
    localforage.setItem('', tempIds);
  };

  const releasePokemon = () => {
    localforage.removeItem(name);
    updateRegisteredIds();
    history.push('/myPokemonList');
  };

  return (
    <>
      <Navbar title={`My Pokémon Detail - ${name}`} />
      <Layout>
        {(detail.data.pokemon === undefined) && (
          <div css={css`margin-top: 1rem;`}>
            <Loading />
          </div>
        )}
        {!(detail.data.pokemon === undefined) && (
          <>
            <div css={css`width: 100vw; text-align: center;`}>
              <img css={css`height: 200px; width: 200px;`} src={detail.data.pokemon.sprites.front_default} alt="pokemon" />
            </div>
            <Card
              isDetail
              css={css`
                width: 60vw;
                background-color: #cecece;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                border-radius: 30px;
                background: #ffffff;
                box-shadow: 8px 8px 16px #c4c4c4, -8px -8px 16px #ffffff;
              `}
            >
              <div css={css` font-weight: 600;`}>{ name.toUpperCase() }</div>
              <div css={css`display: flex; flex-flow: wrap;`}>
                <p>Types</p>
                {detail.data.pokemon.types
                  ? detail.data.pokemon.types.map((data, index) => (
                    <Badge
                      key={index}
                      text={data.type.name}
                      backgroundColor="#00ffa2"
                      color="#004466"
                    />
                  )) : ''}
              </div>
              <div css={css`display: flex; flex-flow: wrap;`}>
                <p>Moves</p>
                {detail.data.pokemon.moves
                  ? detail.data.pokemon.moves.map((data, index) => (
                    <Badge
                      key={index}
                      text={data.move.name}
                      color="#00ffa2"
                      backgroundColor="#004466"
                    />
                  )) : ''}
              </div>
              <div
                css={css`
                  position: fixed;
                  bottom: 100px;
                  left: 0;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  z-index: 3;
                `}
              >
                <Button
                  onClick={releasePokemon}
                  text="Release Pokémon"
                  css={css`
                    border-radius: 5px;
                    background-color: #ff0400;
                    color: #fff;
                    border: none;
                    animation: ${bounceAnimation} 0.3s ease-in infinite both;
                  `}
                />
              </div>
            </Card>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyPokemonDetail;
