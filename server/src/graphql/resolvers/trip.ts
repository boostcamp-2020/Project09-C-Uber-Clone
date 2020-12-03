import Trip from '../../services/trip';

interface PlaceInterface {
  address: string;
  latitude: number;
  longitude: number;
}

interface OpenTripArgs {
  riderEmail: string;
  origin: PlaceInterface;
  destination: PlaceInterface;
  startTime: Date;
  distance?: number;
}

export default {
  Mutation: {
    async openTrip(_: any, args: OpenTripArgs) {
      return await Trip.openTrip(args);
    },
  },
};
