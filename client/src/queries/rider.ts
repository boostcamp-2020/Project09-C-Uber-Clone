import { gql } from '@apollo/client';

const notifyRiderState = gql`
  mutation ($tripId: ID!, $latitude: Float!, $longitude: Float!) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $$longitude) {
      Boolean
    }
  }
`;

const matchedRiderState = gql`
  subscription ($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;

export { notifyRiderState, matchedRiderState };
