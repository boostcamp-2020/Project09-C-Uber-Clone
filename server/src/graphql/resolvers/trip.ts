import { Trip } from '../../services';

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
  distance?: number;
}

interface SetTripStateArgs {
  tripId: string;
  newTripStatus: string;
}

interface ChattingInput {
  tripId: string;
  chatting: { text: string, userId: string, time: Date};
}

export default {
  Query: {
    async trip(_:any, args:ID) {
      return await Trip.get(args);
    },
    async tripStatus(_:any, args:ID) {
      return await Trip.getStatus(args);
    },
    async chattings(_:any, args: {id: string}) {
      const { id } = args;
      return await Trip.getChattings(id);
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
        await Trip.setStatus(args);
        return { result: 'success' };
      } catch {
        return { result: 'fail' };
      }
    },
    async addChatting(_:any, args: ChattingInput) {
      const { tripId, chatting } = args;
      return await Trip.addChatting(tripId, chatting);
    },
  },
};
