import { gql } from '@apollo/client';

export const driverListen = gql`subscription {
	driverListen { 
    riderId
  	origin
  	destination
  }
}`;

