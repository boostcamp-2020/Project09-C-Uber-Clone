import { gql } from '@apollo/client';

export const driverStateNotifyQuery = gql`
mutation driverStateNotify(
  $tripId:String,
  $driverPosition:DriverPositionInput,
  $isDrop:Boolean){
    driverStateNotify(
      tripId:$tripId,
      driverPosition:$driverPosition,
      isDrop:$isDrop
    ){
      tripId
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
