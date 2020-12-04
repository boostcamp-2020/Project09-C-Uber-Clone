import { gql } from '@apollo/client';

export const driverResponded = gql`
    subscription {
        driverResponded { 
            tripId
            driverId
            response
        }
    }
`;

export const driverResponse = gql`
    mutation responseMutation($response:String!,$riderId:ID!,$tripId:ID!){
        sendResponse(response:$response,riderId:$riderId,tripId:$tripId){
            riderId
            tripId
            result
        }
    }
`;
