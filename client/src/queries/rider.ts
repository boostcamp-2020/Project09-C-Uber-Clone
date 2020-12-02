import { gql } from '@apollo/client';

export const notifyRiderStateQuery = gql`
  mutation notifyRiderState($tripId: ID!, $latitude: Float!, $longitude: Float!) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $longitude)
  }
`;

export const matchedRiderStateQuery = gql`
  subscription matchedRiderState($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;
export const matchedDriverState = gql`
	subscription {
		matchedDriverState { 
	    operationId
	    driverId
	    riderId
	    isDrop
	    driverPosition {
				lat
				lng
			}
	  }
	}
`;
