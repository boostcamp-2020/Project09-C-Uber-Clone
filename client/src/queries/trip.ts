import { gql } from '@apollo/client';

export const CANCEL_CALL = gql`mutation cancelCall($id:ID!){
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

export const getOriginPositionAndDestinationPostion = gql`query getOriginPositionAndDestinationPostion($id:ID!){
  trip(id:$id){
    origin{
      latitude
      longitude
    }
    destination{
      latitude
      longitude
    }
  }
}`;

export const setTripStateQuery = gql`
  mutation setTripStatus($tripId: ID!, $newTripStatus: String!) {
    setTripStatus(tripId:$tripId, newTripStatus:$newTripStatus) {
      result
    }
  }
`;
