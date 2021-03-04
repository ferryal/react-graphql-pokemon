/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { jsx } from '@emotion/react';

const Card = (props) => {
  const {
    rounded, elevated, style, className, id, name, urlImg, ownedTotal = [], myPokemon, isDetail, children,
  } = props;
  let count = 0;
  if (!myPokemon && ownedTotal !== null) {
    if (ownedTotal.includes(id)) {
      ownedTotal.forEach((ids) => {
        if (id === ids) { count += 1; }
      });
    }
  }

  return (
    <>
      {
        !isDetail
          ? (
            <Link to={myPokemon === true ? `/my-pokemon-detail/${name}` : `/pokemon/${name}`} css={{ color: '#292829', textDecoration: 'none' }}>
              <div
                className={className}
                css={{
                  borderRadius: rounded ? '10px' : '0',
                  boxShadow: elevated ? '8px 8px 16px #c4c4c4, -8px -8px 16px #ffffff' : 'none',
                  position: 'relative',
                  margin: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: '-2px 6px 13px -4px rgba(0,0,0,0.52)',
                    opacity: '0.6',
                  },
                  ...style,
                }}
              >

                <div>
                  <img css={{ marginTop: '1rem' }} src={urlImg} alt={`${name} Pokemon Profile`} />
                  <p css={{
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                  }}
                  >
                    {name}
                  </p>
                  {!myPokemon && (
                    <div css={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize',
                      paddingTop: '0.3rem',
                      marginBottom: '1rem',
                    }}
                    >
                      owned total:
                      {' '}
                      <span css={{
                        padding: '1px 5px',
                        fontSize: '15px',
                        backgroundColor: '#ff0400',
                        color: '#fff',
                        borderRadius: '15px',
                        fontSize: '16px',
                      }}
                      >
                        {count}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </Link>
          )
          : (
            <div
              className={className}
              css={{
                borderRadius: rounded ? '10px' : '0',
                boxShadow: elevated ? '8px 8px 16px #c4c4c4, -8px -8px 16px #ffffff' : 'none',
                position: 'relative',
                margin: '10px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'column',
                ...style,
              }}
            >
              {children}
            </div>
          )
      }
    </>
  );
};

export default Card;
