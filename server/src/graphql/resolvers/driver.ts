import { AuthenticationError, withFilter } from 'apollo-server-express';
import { Driver, Trip } from '../../services';

import { DRIVER_RESPONDED, CALL_REQUESTED } from '../subscriptions';

interface createDriverArgs {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  carType: string;
  plateNumber: string;
  description: string;
  profileImage: string;
}

interface LoginPayload{
  email:string,
  password:string
}

interface Position{
  lat: number,
  lng: number
}

interface DriverCallArgs {
  riderId: string;
  driverIds: string[];
  origin: Position;
  destination: Position;
}

interface DriverResponse {
  riderId: string;
  tripId: string;
  response: string;
}

const MATCHED_DRIVER_STATE = 'MATCHED_DRIVER_STATE';

export default {
  Query: {
    async driver(_: any, args: { email: string }, context: any) {
      if (!context.req.user) {
        throw new AuthenticationError('No authorization');
      };
      return await Driver.getDriverInfo({ email: args.email });
    },
  },
  Mutation: {
    async createDriver(_: any, args: createDriverArgs) {
      return await Driver.signup(args);
    },
    async loginDriver(_: any, payload:LoginPayload, context:any) {
      return await Driver.login(context, payload);
    },
    async sendResponse(_:any, args:DriverResponse, context:any) {
      const driverId = context.req.user.data._id;
      const checkResult = await Trip.checkStatus(args);
      if (checkResult.result === 'success') {
        context.pubsub.publish(DRIVER_RESPONDED, { driverResponded: { driverId, ...args } });
        await Trip.setMatchedDriver({ driverId, tripId: args.tripId });
      }
      return checkResult;
    },
    driverStateNotify(_:any, args, context:any) {
      context.pubsub.publish(MATCHED_DRIVER_STATE, { matchedDriverState: args });
      return args;
    },
  },
  Subscription: {
    driverListen: {
      subscribe: withFilter((_, args:object, context:any) => {
        return context.pubsub.asyncIterator([CALL_REQUESTED]);
      },
      (payload, variables, context) => {
        if (payload.driverListen.driverIds) {
          return payload.driverListen.driverIds.includes(context.data.currentUser.data._id.toString());
        }
        return false;
      },
      ),
    },
    matchedDriverState: {
      subscribe: (_:any, __:object, context:any) => context.pubsub.asyncIterator([MATCHED_DRIVER_STATE]),
    },
  },
};

