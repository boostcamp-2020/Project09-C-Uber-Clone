import { gql } from '@apollo/client';

const notifyRiderStateQuery = gql`
  mutation notifyRiderState($tripId: ID!, $latitude: Float!, $longitude: Float!) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $longitude)
  }
`;

const matchedRiderStateQuery = gql`
  subscription matchedRiderState($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;

export { notifyRiderStateQuery, matchedRiderStateQuery };
