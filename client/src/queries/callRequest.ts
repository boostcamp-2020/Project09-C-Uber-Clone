import { gql } from '@apollo/client';

export const driverListenSubscription = gql`
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

export const sendDriverCall = gql`
mutation driverCall($origin: TripPlaceInput!, $destination: TripPlaceInput!, $startTime: String!) {
  driverCall(origin: $origin, destination: $destination, startTime: $startTime)
}`;
