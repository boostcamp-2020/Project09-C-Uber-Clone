import { gql } from '@apollo/client';

export const NOTIFY_RIDER_STATE = gql`
  mutation notifyRiderState($tripId: ID!, $latitude: Float, $longitude: Float) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $longitude)
  }
`;

export const LISTEN_MATCHED_DRIVER_STATE = gql`
	subscription matchedDriverState($tripId: ID!) {
		matchedDriverState(tripId: $tripId) {
		tripId
	    driverPosition {
				lat
				lng
		}
		trip{
			id
			status
		}
	  }
	}
`;
