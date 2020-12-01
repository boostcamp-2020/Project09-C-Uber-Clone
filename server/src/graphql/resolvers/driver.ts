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

const CALL_REQUESTED = 'CALL_REQUESTED';
const pubsub = new PubSub();

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
    async loginDriver(_: any, payload:LoginPayload, context) {
      return await Driver.login(context, payload);
    },
    async test(root, args, context) {
      pubsub.publish(CALL_REQUESTED, { callRequested: args.email });
      return args.email;
    },
  },
  Subscription: {
    callRequested: {
      subscribe: () => pubsub.asyncIterator([CALL_REQUESTED]),
    },
  },
};

