import { gql } from '@apollo/client';

export const driverResponded = gql`
    subscription {
        driverResponded { 
            riderID
            driverID
            response
        }
    }
`;

export const driverResponse = gql`
    mutation test($response:String!,$riderID:ID!,$tripID:ID!){
        sendResponse(response:$response,riderID:$riderID,tripID:$tripID){
            riderID
            tripID
            result
        }
    }
`;
