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
    mutation test($message:String!,$riderID:ID!){
        sendResponse(message:$message,riderID:$riderID)
    }
`;
