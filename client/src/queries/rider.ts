import { gql } from '@apollo/client';

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
