import { gql } from '@apollo/client';

export const SIGNUP_DRIVER = gql`
  mutation signupQuery(
    $email:String!,
    $name:String!,
    $password:String!,
    $phoneNumber:String!,
    $carType:String!,
    $plateNumber:String!,
    $description:String,
    $profileImage:String
    ){
      createDriver(
        email:$email,
        name:$name,
        password:$password,
        phoneNumber:$phoneNumber,
        carType:$carType,
        plateNumber:$plateNumber,
        description:$description,
        profileImage:$profileImage
      ){
        id
      }
  }
`;

export const SIGNUP_RIDER = gql`
  mutation signupMutation(    
    $email:String!,
    $name:String!,
    $password:String!,
    $phoneNumber:String!,
    ){
      createRider(
        email:$email,
        name:$name,
        password:$password,
        phoneNumber:$phoneNumber,
      ){
        id
      }
  }
`;

