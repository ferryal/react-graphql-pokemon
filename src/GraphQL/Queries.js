import { gql } from '@apollo/client';

const GET_LIST_POKEMON = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
            name
            image
            url
            }
        }
    }
`;

const GET_DETAIL_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export {
  GET_LIST_POKEMON,
  GET_DETAIL_POKEMON,
};
