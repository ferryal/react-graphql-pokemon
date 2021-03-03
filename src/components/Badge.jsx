/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx } from '@emotion/react';

const Badge = (props) => {
  const {
    text, backgroundColor, color,
  } = props;
  return (
    <span
      css={{
        padding: '5px',
        fontSize: '15px',
        backgroundColor,
        color,
        borderRadius: '10px',
        margin: '10px',
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
