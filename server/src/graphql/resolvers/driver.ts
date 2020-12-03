import { AuthenticationError, PubSub, withFilter } from 'apollo-server-express';
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
  },
  Subscription: {
    driverListen: {
      subscribe: withFilter((_, args, context) => {
        return context.pubsub.asyncIterator(['driverListen']);
      },
      (payload, variables, context) => {
        return payload.driverListen.driveIds.include(context.data.currentUser.data._id.toString);
      },
      ),
    },
  },
};
