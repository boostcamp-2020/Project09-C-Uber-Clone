import { gql } from '@apollo/client';

export const GET_CHATTINGS = gql`
  query chattings($tripId: ID!) {
    chattings(tripId: $tripId) {
      id
      text
      time
      userId
    }
  }
`;
