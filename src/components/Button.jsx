/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx } from '@emotion/react';

const Button = (props) => {
  const {
    text, style, onClick, imgUrl, ...restProps
  } = props;

  return (
    <button
      css={{
        padding: '10px',
        fontSize: '14px',
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid green',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
          opacity: '0.5',
        },
        ...style,
      }}
      onClick={onClick}
      {...restProps}
    >
      {text}
      {imgUrl !== null && (<img src={imgUrl} alt="" />)}
    </button>
  );
};

export default Button;
