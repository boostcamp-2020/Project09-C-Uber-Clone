import { AuthenticationError } from 'apollo-server-express';
import { Driver, Trip } from '../../services';

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

interface DriverResponse {
  riderID: string;
  tripID: string;
  response: string;
}

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
    async createDriver(parent: any, args: createDriverArgs, context: any, info: any) {
      return await Driver.signup(args);
    },
    async loginDriver(parent: any, payload:LoginPayload, context) {
      return await Driver.login(context, payload);
    },
    async driverCall(parent, args : DriverCallArgs, context) {
      context.pubsub.publish('driverListen', { driverListen: args });
      return args;
    },
    async sendResponse(parent:any, args:DriverResponse, context:any) {
      return await Trip.sendDriverResponse(args, context);
    },
  },
  Subscription: {
    driverListen: {
      subscribe: (parent:any, args:object, context:any) => context.pubsub.asyncIterator(['driverListen']),
    },
  },
};

