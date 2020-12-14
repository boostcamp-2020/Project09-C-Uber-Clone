import { gql } from '@apollo/client';

export const VERIFY_USER_ROLE = gql`
  query verifyUser {
    verifyUser {
      role
      tripId
    }
  }
`;
