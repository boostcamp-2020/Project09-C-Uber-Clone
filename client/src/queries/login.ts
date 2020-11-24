import { gql } from '@apollo/client';

export const loginDriver = (email : String, password : String) => gql`query loginQuery {${email}, ${password}}`;
