import { gql } from '@apollo/client';

export const LISTEN_DRIVER_RESPONSE = gql`
  subscription {
    driverResponded { 
      tripId
      driverId
      response
    }
  }
`;

export const NOTIFY_DRIVER_RESPONSE = gql`
mutation responseMutation($response:String!,$riderId:ID!,$tripId:ID!){
  sendResponse(response:$response,riderId:$riderId,tripId:$tripId)
}
`;
