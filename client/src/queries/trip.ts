import { gql } from '@apollo/client';

export const cancelCall = gql`mutation cancelCall($id:ID!){
  cancelTrip(id:$id){
    id
    result
  }
}`;

export const getStatus = gql`query getStatus($id:ID!){
  tripStatus(id:$id)
}`;
