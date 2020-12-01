import { gql } from '@apollo/client';

export const verifyQuery = gql`
  query verifyUser {
    verifyUser {
      role
    }
  }
`;
