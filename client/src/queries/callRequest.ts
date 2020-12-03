import { gql } from '@apollo/client';

export const driverListen = gql`
subscription {
	driverListen { 
    driverIds
    riderId
  	origin { 
      lat
      lng 
    }
  	destination { 
      lat
      lng 
    }
  }
}`;

export const driverCall = gql`
  mutation driverCall(
    $driverIds: [String],
    $riderId: String,
    $origin: PositionInput,
    $destination: PositionInput){
      driverCall(
        driverIds:$driverIds,
        riderId:$riderId,
        origin:$origin,
        destination: $destination){
          driverIds
          riderId
          origin{ 
          	lat
            lng
          }
          destination{ 
          	lat
            lng
          }
  }
}`;
