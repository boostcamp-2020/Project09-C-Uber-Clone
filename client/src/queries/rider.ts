import { gql } from '@apollo/client';

export const NOTIFY_RIDER_STATE = gql`
  mutation notifyRiderState($tripId: ID!, $latitude: Float, $longitude: Float, $isCancel: Boolean) {
    notifyRiderState(tripId: $tripId, latitude: $latitude, longitude: $longitude, isCancel: $isCancel)
  }
`;

export const LISTEN_MATCHED_DRIVER_STATE = gql`
	subscription matchedDriverState($tripId: ID!) {
		matchedDriverState(tripId: $tripId) {
		tripId
		onBoard
	    isDrop
	    driverPosition {
				lat
				lng
			}
	  }
	}
`;
