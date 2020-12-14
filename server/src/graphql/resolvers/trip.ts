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

interface setArrivalsInput {
  tripId: string;
  arrivalTime: Date;
  destination: {
    address: string;
    latitude: number;
    longitude:number;
  };
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

type Status = 'open' | 'matched' | 'onBoard' | 'close' | 'cancel';

export default {
  MatchedRider: {
    id: ({ _id }) => _id,
  },
  MatchedDriver: {
    id: ({ _id }) => _id,
  },
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
    async myTrips(_: any, args: { statuses?: Status[] }, context: any) {
      const user = context.req.user;
      const { statuses } = args;
      if (!statuses) {
        return await Trip.getMyTrip(user.data._id, user.isDriver, ['open', 'matched', 'onBoard', 'close', 'cancel']);
      }
      return await Trip.getMyTrip(user.data._id, user.isDriver, statuses);
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
          return { result: 'close success', trip };
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
    async setArrivals(_:any, args: setArrivalsInput, context: any) {
      const { tripId, arrivalTime, destination } = args;
      const result = await Trip.setArrivals(tripId, arrivalTime, destination);
      return result;
    },
  },
};
