import { AuthenticationError, PubSub } from 'apollo-server-express';
import { Driver } from '../../services';

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

interface DriverCallArgs {
  riderId: string;
  origin: string;
  destination: string;
}

const pubsub = new PubSub();

const MATCHED_DRIVER_STATE = 'MATCHED_DRIVER_STATE';

export default {
  Query: {
    async driver(parent: any, args: { email: string }, context: any, info: any) {
      if (!context.req.user) {
        throw new AuthenticationError('No authorization');
      };
      return await Driver.getDriverInfo({ email: args.email });
    },
  },
  Mutation: {
    async createDriver(_, args: createDriverArgs) {
      return await Driver.signup(args);
    },
    async loginDriver(_: any, payload:LoginPayload, context) {
      return await Driver.login(context, payload);
    },
    async driverCall(_, args : DriverCallArgs) {
      pubsub.publish('driverListen', { driverListen: args });
      return await args;
    },
    driverStateNotify(_, args) {
      pubsub.publish(MATCHED_DRIVER_STATE, { matchedDriverState: args });
      return args;
    },
  },
  Subscription: {
    driverListen: {
      subscribe: () => pubsub.asyncIterator(['driverListen']),
    },
    matchedDriverState: {
      subscribe: () => pubsub.asyncIterator([MATCHED_DRIVER_STATE]),
    },
  },
};

