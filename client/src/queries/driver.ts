import { gql } from '@apollo/client';

export const driverStateNotifyQuery = gql`
  mutation driverStateNotify(
    $operationId: String
    $driverId: String
    $riderId: String
    $driverPosition: String
    $isDrop: Boolean
    ){
    loginRider(
      operationId:$operationId,
      driverId:$driverId
      riderId:$riderId
      driverPosition:$driverPosition
      isDrop:$isDrop
      ){
      operationId
      driverId
      riderId
      driverPosition
      isDrop
    }
  }
`;
