import { gql } from '@apollo/client';

export const driverStateNotifyQuery = gql`
mutation driverStateNotify(
  $operationId:String,
  $driverId:String,
  $riderId:String,
  $driverPosition:DriverPositionInput,
  $isDrop:Boolean){
      driverStateNotify(
        operationId:$operationId,
        driverId:$driverId,
        riderId:$riderId,
        driverPosition:$driverPosition,
        isDrop:$isDrop
      ){
        operationId
        driverId
        riderId
        isDrop
        driverPosition {
          lat
          lng
        }
      }
    }
`;
