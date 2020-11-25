import { gql } from '@apollo/client';

export const loginRider = gql`mutation loginQuery($email:String!,$password:String!){
  loginRider(email:$email,password:$password)
}`;

export const loginDriver = gql`mutation loginQuery($email:String!,$password:String!){
  loginDriver(email:$email,password:$password)
}
`;

