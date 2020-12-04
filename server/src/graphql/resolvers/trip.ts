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

export default {
  Query: {
    async tripStatus(_:any, args:ID) {
      return await Trip.getStatus(args);
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
  },
};
