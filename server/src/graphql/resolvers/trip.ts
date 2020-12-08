import { Document } from 'mongoose';
import { Trip } from '../../services';
import { MATCHED_DRIVER_STATE } from '../subscriptions';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

interface ID{
  id:string
}

interface OpenTripArgs {
  riderEmail: string;
  origin: PlaceInterface;
  destination: PlaceInterface;
  startTime: Date;
  estimatedTime: string
  estimatedDistance: string
}

interface SetTripStateArgs {
  tripId: string;
  newTripStatus: string;
}

interface ChattingInput {
  tripId: string;
  chattingInput: { text: string, time: Date};
}

interface ChattingInterface {
  _id: string;
  text: string;
  time: Date;
  ownerId: string;
}

export default {
  Query: {
    async trip(_:any, args:ID) {
      return await Trip.get(args);
    },
    async tripStatus(_:any, args:ID) {
      return await Trip.getStatus(args);
    },
    async chattings(_:any, args: {id: string}, context: any) {
      const tripId = args.id;
      const { _id } = context.getUser().data;
      const chattings = await Trip.getChattings(tripId) as ChattingInterface[];
      if (chattings) {
        return chattings.map((chatting) => {
          const isOwner = chatting.ownerId === _id.toString();
          return {
            id: chatting._id,
            text: chatting.text,
            ownerId: chatting.ownerId,
            time: chatting.time,
            isOwner,
          };
        });
      } else {
        return [];
      }
    },
  },
  Mutation: {
    async cancelTrip(_: any, args:ID) {
      return await Trip.cancel(args);
    },
    async openTrip(_: any, args: OpenTripArgs, context: any) {
      const riderEmail = context.req.user.data.email;
      return await Trip.openTrip({ ...args, riderEmail });
    },
    async setTripStatus(_: any, args: SetTripStateArgs, context: any) {
      try {
        const trip = await Trip.setStatus(args);
        if (trip && trip.status === 'close') {
          context.pubsub.publish(MATCHED_DRIVER_STATE, { matchedDriverState: { tripId: trip._id, isDrop: true } });
        }
        return { result: 'success', trip };
      } catch {
        return { result: 'fail' };
      }
    },
    async addChatting(_:any, args: ChattingInput, context: any) {
      const { tripId, chattingInput } = args;
      const user = context.getUser().data;
      const chatting = { ...chattingInput, ownerId: user._id };
      const newChatting = await Trip.addChatting(tripId, chatting) as ChattingInterface;
      if (newChatting) {
        return {
          id: newChatting._id,
          text: newChatting.text,
          time: newChatting.time,
          ownerId: newChatting.ownerId,
          isOwner: true,
        };
      } else {
        return null;
      }
    },
  },
};
