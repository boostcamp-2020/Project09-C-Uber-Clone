import { gql } from '@apollo/client';

export const GET_CHATTINGS = gql`
  query chattings($tripId: ID!) {
    chattings(tripId: $tripId) {
      id
      text
      time
      ownerId
      isOwner
    }
  }
`;

export const ADD_CHATTING = gql`
  mutation addChatting($tripId: ID!, $chatting: ChattingInput!) {
    addChatting(tripId: $tripId, chatting: $chatting) {
      id
      text
      time
      ownerId
      isOwner
    }
  }
`;
