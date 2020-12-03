import { gql } from '@apollo/client';

export const driverStateNotifyQuery = gql`
mutation driverStateNotify(
  $tripId:String,
  $driverId:String,
  $riderId:String,
  $driverPosition:DriverPositionInput,
  $isDrop:Boolean){
    driverStateNotify(
      tripId:$tripId,
      driverId:$driverId,
      riderId:$riderId,
      driverPosition:$driverPosition,
      isDrop:$isDrop
    ){
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

export const matchedRiderStateQuery = gql`
  subscription matchedRiderState($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;
