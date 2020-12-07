import { gql } from '@apollo/client';

export const NOTIFY_DRIVER_STATE = gql`
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

export const LISTEN_MATCHED_RIDER_STATE = gql`
  subscription matchedRiderState($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
    }
  }
`;

export const updateDriverPosQuery = gql`
  mutation updateDriverPosition($lat: Float, $lng: Float) {
    updateDriverPosition(lat: $lat, lng: $lng) {
      result
    }
  }
`;
