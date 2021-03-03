/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import localforage from 'localforage';
import { useHistory } from 'react-router-dom';
import { jsx, css } from '@emotion/react';
import { Button } from '../components';
import PikachuSad from '../assets/pikachu-sad.png'

const Modal = (props) => {
  const {
    pokemon, isPokemonCaught, pokemonDetail, setIsPokemonCaught
  } = props;
  const [nameList, setNameList] = useState([]);
  const [nickname, setNickname] = useState("");
  const [registeredIds, setRegisteredIds] = useState([]);
  const history = useHistory();
  let title = isPokemonCaught >= 50 ? "GOTCHA" : "OH NO...";
  let message = isPokemonCaught >= 50 ? "was caught!" : "has escaped";

  useEffect( () => {
    const fetchData = async () => {
      const result = await localforage.keys()
      setNameList(result)
    }
    fetchData()
  }, [])

  useEffect( () => {
    const fetchIds = async () => {
      const res = await localforage.getItem('')
      setRegisteredIds(res)
    }
    fetchIds()
  }, [])
  
  
  const handleNicknameInput = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  const handleRegisterPokemonId = () => {
    if (nameList.includes('')) {
      const newIds = [...registeredIds, pokemonDetail.pokemon.id]
      localforage.setItem('', newIds)
    } else {
      localforage.setItem('', [pokemonDetail.pokemon.id])
    }
  }

  const setMyPokemon = () => {
    const setItemPokemon = {
      nickname: nickname,
      data: pokemonDetail
    }
    localforage.setItem(nickname, setItemPokemon);
    handleRegisterPokemonId()
    history.push('/my-pokemon')
  }

  const validateNickname = () => {
    if (nameList.includes(nickname)) {
      document.getElementById("nicknameErrMessage").innerHTML = "Name already registered. Please choose another name"
    }
    else {
      setMyPokemon()
    }
  }

  return (
    <div css={css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      color: black;
    `}>
      <div css={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.3);
      `} 
        onClick={() => setIsPokemonCaught(null)}
      />
      <div css={css`
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-height: 30%;
        width: 40%;
        background-color: white;
        overflow-y: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        z-index: 101;
        padding: 40px;
        text-align: center;
        border-radius: 10px;
      `}>
        <p css={css`
          text-align: center;
          font-size: 2rem;
          margin: 0;`}>{title}</p>
        <p css={css`
          text-align: center;
          font-size: 2rem;
          margin: 0;`}>
          {pokemon} {message}
        </p>
        {isPokemonCaught <= 50 && (
          <>
          <img src={PikachuSad} alt="pikachu sad" css={css` width: 200px; margin-top: 1rem;`} />
          <p css={css`
              text-align: center;
              font-size: 2rem;
              margin-top: 1rem;
            `}>
            try again?
          </p>
          </>
        )}
        {isPokemonCaught >= 50 && (
          <>
            <img src={pokemonDetail.pokemon.sprites.front_default} alt="Pokemon Sprites" />
            <p css={css`
              font-size: 1.3rem;
              margin: 20px;
              text-align: center;
            `}>let's give nickname to your new friend!</p>
            <input type="text" value={nickname} onChange={handleNicknameInput} placeholder="Give me a name" />
            <p id="nicknameErrMessage" css={css`
              font-size: 0.8rem;
              margin: 20px;
              color: #db6969;
              text-align: center;
            `}></p>
            {(nickname.length > 0) && (<Button onClick={validateNickname} text="Confirm catch" />)}
            </>
        )}
      </div>
    </div>
  );
};

export default Modal;
