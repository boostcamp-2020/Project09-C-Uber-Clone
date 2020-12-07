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

export const pickUpPos = gql`query pickUpPos($id:ID!){
  trip(id:$id){
    origin{
      latitude
      longitude
    }
  }
}`;

export const setTripStateQuery = gql`
  mutation setTripStatus($tripId: String!, $newTripStatus: String!) {
    setTripStatus(tripId:$tripId, newTripStatus:$newTripStatus) {
      result
    }
  }
`;
