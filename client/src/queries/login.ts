import { gql } from '@apollo/client';

export const loginRider = (email : String, password : String) => gql`mutation loginQuery(${email}:String!,${password}:String!){
  loginRider(email:${email},password:${password}){
    String
  }
}
`;

export const loginDriver = (email : String, password : String) => gql`mutation loginQuery(${email}:String!,${password}:String!){
  loginDriver(email:${email},password:${password}){
    String
  }
}
`;

