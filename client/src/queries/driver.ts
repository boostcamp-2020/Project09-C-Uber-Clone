import { gql } from '@apollo/client';

export const NOTIFY_DRIVER_STATE = gql`
mutation driverStateNotify(
  $tripId:String,
  $driverPosition:DriverPositionInput,
  $onBoard:Boolean,
  $isDrop:Boolean){
    driverStateNotify(
      tripId:$tripId,
      driverPosition:$driverPosition,
      onBoard:$onBoard
      isDrop:$isDrop
    ){
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

export const LISTEN_MATCHED_RIDER_STATE = gql`
  subscription matchedRiderState($tripId: ID!) {
    matchedRiderState(tripId: $tripId) {
      tripId
      latitude
      longitude
      isCancel
    }
  }
`;

export const ADD_DRIVER_POSITION = gql`
  mutation updateDriverPosition($lat: Float, $lng: Float) {
    updateDriverPosition(lat: $lat, lng: $lng) {
      result
    }
  }
`;
