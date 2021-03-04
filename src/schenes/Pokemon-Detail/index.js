/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { jsx, css, keyframes } from '@emotion/react';
import useSound from 'use-sound';
import {
  Layout, Card, Navbar, Modal, Button, Badge, Loading,
} from '../../components';
import { GET_DETAIL_POKEMON } from '../../GraphQL/Queries';
import sfx from '../../assets/i-caught-you.mp3';

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

const PokemonDetail = () => {
  const [isPokemonCaught, setIsPokemonCaught] = useState(null);
  const { name } = useParams();
  const [play] = useSound(sfx);

  const { loading, error, data: pokemonDetail } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name },
    onError: (e) => {
      throw e;
    },
  });

  const getProbabilityCatch = () => {
    const randomCatch = Math.floor(Math.random() * 100) + 1;
    play();
    setIsPokemonCaught(randomCatch);
  };

  return (
    <>
      <Navbar title={`Pokémon Detail - ${name}`} />
      <Layout>
        {loading && (
          <div css={css`margin-top: 1rem;`}>
            <Loading />
          </div>
        )}
        {!(error || loading) && (
          <>
            <div css={css`width: 100vw; text-align: center;`}>
              <img css={css`height: 200px; width: 200px;`} src={pokemonDetail.pokemon.sprites.front_default} alt="pokemon" />
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
              <div css={css`font-weight: 600;`}>{ name.toUpperCase() }</div>
              <div css={css`display: flex; flex-flow: wrap;`}>
                <p>Types</p>
                {pokemonDetail.pokemon.types && (
                  pokemonDetail.pokemon.types.map((data, key) => (
                    <Badge
                      key={key}
                      text={data.type.name}
                      backgroundColor="#00ffa2"
                      color="#004466"
                    />
                  ))
                )}
              </div>
              <div css={css`display: flex; flex-flow: wrap;`}>
                <p>Moves</p>
                {pokemonDetail.pokemon.moves && (
                  pokemonDetail.pokemon.moves.map((data, key) => (
                    <Badge
                      key={key}
                      text={data.move.name}
                      color="#00ffa2"
                      backgroundColor="#004466"
                    />
                  ))
                )}
              </div>
            </Card>
          </>
        )}
      </Layout>

      {/* Modal for catching pokemon */}
      {isPokemonCaught !== null && (
        <Modal
          pokemon={name}
          isPokemonCaught={isPokemonCaught}
          pokemonDetail={pokemonDetail}
          setIsPokemonCaught={setIsPokemonCaught}
        />
      )}

      {/* Button catch pokemon and trigger the modal */}
      {(!isPokemonCaught || isPokemonCaught === null) && (
        <div css={css`
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
            css={css`
            animation: ${bounceAnimation} 0.3s ease-in infinite both;
            border-radius: 5px;
            background-color: #03ac0d;
            color: #fff;
            border: none;
          `}
            onClick={getProbabilityCatch}
            text="Catch Pokémon"
          />
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
