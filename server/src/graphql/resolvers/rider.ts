import { withFilter } from 'apollo-server-express';
import { Rider, Trip, Driver } from '../../services';

import { DRIVER_RESPONDED, CALL_REQUESTED, MATCHED_RIDER_STATE } from '../subscriptions';

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

interface Position {
  lat: number
  lng: number
}

interface TripPlace {
  address: string
  latitude: number
  longitude: number
}

interface DriverCallArgs {
  origin: TripPlace
  destination: TripPlace
  startTime: Date
  estimatedTime: string
  estimatedDistance: string
}

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
    async driverCall(parent:any, args: DriverCallArgs, { req, pubsub }:any) {
      const riderEmail = req.user.data.email;
      const trip = await Trip.openTrip({ ...args, riderEmail });
      let driverIds = await Driver.getDriverList({ lat: args.origin.latitude, lng: args.origin.longitude, callRadius: 0.03 });
      driverIds = driverIds.map(v => v._id.toString());

      pubsub.publish(CALL_REQUESTED, { driverListen: { trip, driverIds } });
      return { result: 'success', trip };
    },
    async driverRecall(parent:any, args: {id:string}, { req, pubsub }:any) {
      const trip = await Trip.get(args);
      let driverIds = await Driver.getDriverList({ lat: trip?.origin?.latitude, lng: trip?.origin?.longitude, callRadius: 0.05 });
      driverIds = driverIds.map(v => v._id.toString());
      pubsub.publish(CALL_REQUESTED, { driverListen: { trip, driverIds } });
      return { result: 'success', trip };
    },
    async notifyRiderState(parent: any, args: any, context: any) {
      const trip = await Trip.get({ id: args.tripId });
      context.pubsub.publish(MATCHED_RIDER_STATE, { matchedRiderState: { ...args, trip } });
      return true;
    },
  },
  Subscription: {
    matchedRiderState: {
      subscribe: withFilter(
        (_, __, context) => {
          return context.pubsub.asyncIterator([MATCHED_RIDER_STATE]);
        },
        (payload, variables) => {
          return payload.matchedRiderState.tripId === variables.tripId;
        },
      ),
    },
    driverResponded: {
      subscribe: withFilter((parent, args, context) => {
        return context.pubsub.asyncIterator([DRIVER_RESPONDED]);
      },
      (payload, variables, context) => {
        return payload.driverResponded.rider._id.toString() === context.data.currentUser.data._id.toString();
      },
      ),
    },
  },
};
