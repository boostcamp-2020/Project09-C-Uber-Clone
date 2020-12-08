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
    }
  }
}`;

export const NOTIFY_RIDER_CALL = gql`
mutation driverCall($origin: TripPlaceInput!, $destination: TripPlaceInput!, $startTime: String!) {
  driverCall(origin: $origin, destination: $destination, startTime: $startTime)
}`;
