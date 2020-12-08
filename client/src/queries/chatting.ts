import { gql } from '@apollo/client';

export const GET_CHATTINGS = gql`
  query chattings($id: ID!) {
    chattings(id: $id) {
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
