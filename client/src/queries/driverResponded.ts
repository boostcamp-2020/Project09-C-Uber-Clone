import { gql } from '@apollo/client';

export const LISTEN_DRIVER_RESPONSE = gql`
  subscription {
    driverResponded { 
      id
      driver{
        id
      }
      status
    }
  }
`;

export const NOTIFY_DRIVER_RESPONSE = gql`
mutation responseMutation($response:String!,$riderId:ID!,$tripId:ID!){
  sendResponse(response:$response,riderId:$riderId,tripId:$tripId){
    result
    trip{
      id
      status
    }
  }
}
`;
