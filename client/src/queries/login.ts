import { gql } from '@apollo/client';

export const loginRider = gql`mutation loginQuery($email:String!,$password:String!){
  loginRider(email:$email,password:$password)
}`;

