import { gql } from '@apollo/client';

export const USER_ROLE = gql`
  query verifyUser {
    verifyUser {
      role
    }
  }
`;
