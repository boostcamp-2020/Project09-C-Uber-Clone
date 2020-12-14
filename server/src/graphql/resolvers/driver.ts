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

interface DriverResponse {
  riderId: string;
  tripId: string;
  response: string;
}

interface DriverPosition {
  lat: number;
  lng: number;
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
      const result = await Trip.checkStatus(args);
      if (result === 'success') {
        const trip = await Trip.setMatchedDriver({ driverId, tripId: args.tripId });
        context.pubsub.publish(DRIVER_RESPONDED, { driverResponded: trip });
        return { result, trip };
      }
      const trip = await Trip.get({ id: args.tripId });
      return { result, trip };
    },
    async driverStateNotify(_:any, args, context:any) {
      const trip = await Trip.get({ id: args.tripId });
      context.pubsub.publish(MATCHED_DRIVER_STATE, { matchedDriverState: { ...args, trip } });
      return args;
    },
    async updateDriverPosition(_:any, args: any, { req }:any) {
      try {
        await Driver.updateDriverPosition({ driverId: req.user.data._id, ...args });
        return { result: 'success' };
      } catch (error) {
        return { result: 'fail' };
      }
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
      subscribe: withFilter((_:any, __:object, context:any) => {
        return context.pubsub.asyncIterator([MATCHED_DRIVER_STATE]);
      },
      (payload, variables) => {
        return payload.matchedDriverState.tripId.toString() === variables.tripId.toString();
      },
      ),
    },
  },
};

