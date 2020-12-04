import { withFilter } from 'apollo-server-express';
import { Rider, Trip } from '../../services';

import DriverService from '../../services/driver';

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

interface riderPublishInfo {
  riderId: string
  riderEmail: string
  riderName: string
  riderPos: Position
  driverIds: string[]
  pickUpPos: Position
  pickUpAddress: string
  destinationPos: Position
  destinationAddress: string
  tripStatus: string
  tripId: string
}

interface DriverCallArgs {
  riderPublishInfo: riderPublishInfo
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
      //TODO: args 타입을 openTrip payload 타입이랑 맞추기
      const payload = { riderEmail: req.user.data.email,
        origin: { address: args.riderPublishInfo.pickUpAddress, latitude: args.riderPublishInfo.pickUpPos.lat, longitude: args.riderPublishInfo.pickUpPos.lng },
        destination: { address: args.riderPublishInfo.destinationAddress, latitude: args.riderPublishInfo.destinationPos.lat, longitude: args.riderPublishInfo.destinationPos.lng },
        startTime: new Date(),
      };
      const result = await Trip.openTrip(payload);
      const driverIds = await DriverRepository.findAllByDistance(args.riderPublishInfo.pickUpPos);
      args.riderPublishInfo = {
        ...args.riderPublishInfo,
        driverIds: driverIds.map(v => v._id.toString()),
        riderId: req.user.data._id,
        riderEmail: req.user.data.email,
        riderName: req.user.data.name,
        tripId: result?._id,
      };
      pubsub.publish(CALL_REQUESTED, { driverListen: { ...args } });
      return args.riderPublishInfo;
    },
    async notifyRiderState(parent: any, args: any, context: any) {
      context.pubsub.publish(MATCHED_RIDER_STATE, { matchedRiderState: args });
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
        return payload.driverResponded.riderId === context.data.currentUser.data._id.toString();
      },
      ),
    },
  },
};
