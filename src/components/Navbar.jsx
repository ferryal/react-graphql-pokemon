/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react';
import LogoPokemon from '../assets/logo.png';

const Container = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  background: #1f4037;
  background: -webkit-linear-gradient(to right, #1f4037, #99f2c8);
  background: linear-gradient(to right, #1f4037, #99f2c8);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
`;

const WrapperItem = styled.div`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  font-variant: small-caps;
  margin: 0px 30px;
`;

const ContainerMobile = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #1f4037;
  background: -webkit-linear-gradient(to right, #1f4037, #99f2c8);
  background: linear-gradient(to right, #1f4037, #99f2c8);
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
`;

const Navbar = (props) => {
  const { title } = props;
  return (
    <>
      <Container>
        <WrapperItem css={{
          marginLeft: '5vw',
          fontSize: '2rem',
        }}
        >
          {title}
        </WrapperItem>
        <div css={{ flexGrow: 1 }}>
          <img src={LogoPokemon} alt="Logo" css={{ width: '16vw' }} />
        </div>
        <WrapperItem css={{
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
        >
          <Link to="/" css={{ textDecoration: 'none', color: '#fff' }}>
            Pokédex
          </Link>
        </WrapperItem>
        <WrapperItem css={{
          '@media screen and (max-width: 600px)': {
            display: 'none',
          },
        }}
        >
          <Link to="/my-pokemon" css={{ textDecoration: 'none', color: '#fff' }}>
            My Pokémon
          </Link>
        </WrapperItem>
      </Container>
      <ContainerMobile css={{
        '@media screen and (min-width: 600px)': {
          display: 'none',
        },
      }}
      >
        <WrapperItem>
          <Link to="/" css={{ textDecoration: 'none', color: '#fff' }}>
            <p>Pokédex</p>
          </Link>
        </WrapperItem>
        <WrapperItem className="navbar-mobile__item">
          <Link to="/my-pokemon" css={{ textDecoration: 'none', color: '#fff' }}>
            <p>My Pokémon</p>
          </Link>
        </WrapperItem>
      </ContainerMobile>
    </>
  );
};

export default Navbar;
