import { gql } from '@apollo/client';

export const matchedDriverState = gql`
	subscription {
		matchedDriverState { 
	    tripId
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
