import { gql } from '@apollo/client';

const notifyRiderStateQuery = gql`
  mutation ($tripId: ID!, $latitude: Float!, $longitude: Float!) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $$longitude) {
      Boolean
    }
  }
`;

const matchedRiderStateQuery = gql`
  subscription ($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;

export { notifyRiderStateQuery, matchedRiderStateQuery };
