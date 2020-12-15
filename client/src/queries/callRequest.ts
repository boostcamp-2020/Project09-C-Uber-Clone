import { gql } from '@apollo/client';

export const LISTEN_DRIVER_CALL = gql`
subscription {
  driverListen {
    trip{
      id
      rider{
        id
        email
        name
      }
      origin{
        address
        latitude
        longitude
      }
      destination{
        address
        latitude
        longitude
      }
      startTime
      status
      estimatedTime
      estimatedDistance
    }
  }
}`;

export const NOTIFY_RIDER_CALL = gql`
mutation driverCall($origin: TripPlaceInput!, $destination: TripPlaceInput!, $startTime: String!, $estimatedTime: String!, $estimatedDistance: String!) {
  driverCall(origin: $origin, destination: $destination, startTime: $startTime, estimatedTime: $estimatedTime, estimatedDistance: $estimatedDistance){
    result
    trip{
      id
      status
    }
  }
}`;

export const RE_NOTIFY_RIDER_CALL = gql`
mutation driveRecall($id: ID!) {
  driverRecall(id: $id){
    result
    trip{
      id
      status
    }
  }
}`;
