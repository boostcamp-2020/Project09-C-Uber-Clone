import { gql } from '@apollo/client';

export const notifyRiderStateQuery = gql`
  mutation notifyRiderState($tripId: ID!, $latitude: Float!, $longitude: Float!) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $longitude)
  }
`;

export const matchedDriverState = gql`
	subscription matchedDriverState($tripId: ID!) {
		matchedDriverState(tripId: $tripId) {
	    tripId
	    isDrop
	    driverPosition {
				lat
				lng
			}
	  }
	}
`;
