import { PubSub } from 'apollo-server-express';

import { Rider } from '../../services';

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

const pubsub = new PubSub();

const MATCHED_RIDER_STATE = 'MATCHED_RIDER_STATE';
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
    async notifyRiderState(parent: any, args: any, context: any) {
      pubsub.publish(MATCHED_RIDER_STATE, { matchedRiderState: args });
    },
  },
  Subscription: {
    matchedRiderState: {
      subscribe: () => pubsub.asyncIterator([MATCHED_RIDER_STATE]),
    },
  },
};
