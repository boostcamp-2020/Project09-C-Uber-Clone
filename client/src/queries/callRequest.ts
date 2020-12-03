import { gql } from '@apollo/client';

export const driverListen = gql`
subscription {
  driverListen {
    riderPublishInfo {
      riderId
      riderEmail
      riderName
      riderPos{ 
        lat
        lng 
      }
      pickUpPos{ 
        lat
        lng 
      }
      pickUpAddress
      destinationPos { 
        lat
        lng 
      }
      destinationAddress
      tripStatus
    }
  }
}`;

export const driverCall = gql`
  mutation driverCall($riderPublishInfo: riderPublishInfoInput){
    driverCall(riderPublishInfo:$riderPublishInfo){
      riderId
      riderEmail
      riderName
      riderPos {
        lat
        lng
      }
      pickUpPos {
        lat
        lng
      }
      pickUpAddress
      destinationPos {
        lat
        lng
      }
      destinationAddress
      tripStatus
    }
}`;
