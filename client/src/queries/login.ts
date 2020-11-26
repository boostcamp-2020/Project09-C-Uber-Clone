import { gql } from '@apollo/client';

export const loginRiderQuery = gql`mutation loginQuery($email:String!,$password:String!){
  loginRider(email:$email,password:$password){
    success
    name
    token
    message
    role
  }
}`;

export const loginDriverQuery = gql`mutation loginQuery($email:String!,$password:String!){
  loginDriver(email:$email,password:$password){
    success
    name
    token
    message
    role
  }
}
`;

