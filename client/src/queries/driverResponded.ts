import { gql } from '@apollo/client';

export const driverResponded = gql`
    subscription {
        driverResponded { 
            riderId
            driverId
            response
        }
    }
`;

export const driverResponse = gql`
    mutation test($response:String!,$riderId:ID!,$tripId:ID!){
        sendResponse(response:$response,riderId:$riderId,tripId:$tripId){
            riderId
            tripId
            result
        }
    }
`;
