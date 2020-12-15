import { gql } from '@apollo/client';

export const CANCEL_TRIP = gql`mutation cancelCall($id:ID!){
  cancelTrip(id:$id){
    result
    trip{
      id
      status
    }
  }
}`;

export const GET_TRIP_STATUS = gql`query getStatus($id:ID!){
  trip(id:$id){
    id
    status
  }
}`;

export const GET_PICK_UP_POSITION = gql`query pickUpPos($id:ID!){
  trip(id:$id){
    origin{
      latitude
      longitude
    }
  }
}`;

export const GET_ORIGIN_POSITION_AND_DESTINATION_POSITION = gql`query getOriginPositionAndDestinationPostion($id:ID!){
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

export const GET_TRIP = gql`query getTrip($id:ID!){
  trip(id:$id){
    id
    rider{
      id
      name
      email
    }
    driver{
      id
      email
      name
      carType
      plateNumber
      description
      profileImage
    }
    origin{
      address
      latitude
      longitude
    }
    destination{
      address
      latitude
      longitude
    }
    startTime
    arrivalTime
    status
    estimatedTime
    estimatedDistance
  }
}`;

export const TRIP_STATUS = gql`query ($id:ID!){
  tripStatus(id:$id){
    id
    status
  }
}
`;

export const GET_TRIP_BEFORE_MATCHING = gql`query getTrip($id:ID!){
  trip(id:$id){
    id
    rider{
      id
      name
      email
    }
    origin{
      address
      latitude
      longitude
    }
    destination{
      address
      latitude
      longitude
    }
    startTime
    arrivalTime
    status
    estimatedTime
    estimatedDistance
  }
}`;

export const ADD_TRIP_STATUS = gql`
  mutation setTripStatus($tripId: ID!, $newTripStatus: String!) {
    setTripStatus(tripId:$tripId, newTripStatus:$newTripStatus) {
      result
      trip{
        id
        status
      }
    }
  }
`;

export const SET_ARRIVAL_DATA = gql`
  mutation setArrivals($tripId: ID!, $arrivalTime: String!, $destination: TripPlaceInput!) {
  setArrivals(tripId: $tripId, destination: $destination, arrivalTime: $arrivalTime){
    destination{
      address
      latitude
      longitude
    }
  }
}
`;
export const GET_MY_TRIPS = gql`
  query myTrips($statuses: [String]) {
    myTrips(statuses: $statuses) {
      id
      rider{
        id
        name
        email
      }
      origin{
        address
        latitude
        longitude
      }
      destination{
        address
        latitude
        longitude
      }
      startTime
      arrivalTime
      status
      estimatedTime
      estimatedDistance
    }
  }
`;
