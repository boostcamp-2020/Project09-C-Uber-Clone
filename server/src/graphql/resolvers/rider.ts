import { PubSub } from 'apollo-server-express';

import { withFilter } from 'apollo-server-express';
import { Rider } from '../../services';
import { Trip } from '../../services';

import { DRIVER_RESPONDED } from '../subscriptions';
interface LoginPayload{
  email:string;
  password:string;
}

interface createRiderArgs {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface DriverCallArgs {
  riderId: string;
  driverId: string;
  origin: string;
  destination: string;
  state: string;
}

const pubsub = new PubSub();

export default {
  Query: {
    async rider(parent: any, args: { email: string }, context: any, info: any) {
      return await Rider.getRiderInfo({ email: args.email });
    },
  },
  Mutation: {
    async loginRider(_: any, payload:LoginPayload, context) {
      return await Rider.login(context, payload);
    },
    async createRider (parent: any, payload: createRiderArgs, context: any) {
      return await Rider.signup(payload);
    },
    async driverCall(parent:any, args: DriverCallArgs, context:any) {
      pubsub.publish('driverListen', { driverListen: args });
      return await Trip.create(args);
    },
  },
  Subscription: {
    driverResponded: {
      subscribe: withFilter((parent, args, context) => {
        return context.pubsub.asyncIterator([DRIVER_RESPONDED]);
      },
      (payload, variables, context) => {
        return payload.driverResponded.riderId === context.data.currentUser.data._id.toString();
      },
      ),
    },
  },
};
