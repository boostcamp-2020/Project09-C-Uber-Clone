import { gql } from '@apollo/client';

export const LOGIN_RIDER = gql`
  mutation loginQuery($email:String!,$password:String!){
    loginRider(email:$email,password:$password){
      success
      name
      token
      message
      role
    }
  }
`;

export const LOGIN_DRIVER = gql`
  mutation loginQuery($email:String!,$password:String!){
    loginDriver(email:$email,password:$password){
      success
      name
      token
      message
      role
    }
  }
`;

