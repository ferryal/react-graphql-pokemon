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

export {
  GET_LIST_POKEMON,
};
