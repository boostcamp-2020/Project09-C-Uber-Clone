import bcrypt from 'bcrypt';

import { Trip } from '../repositories';

export default {
  sendDriverResponse: async (args, context) => {
    try {
      const driverID = context.req.user.data._id;
      const data = await Trip.findOneStatus(args.tripID);
      if (data?.status === 'open') {
        Trip.updateStatus(args.tripID, 'matched');
        context.pubsub.publish('driverResponded', { driverResponded: { driverID, ...args } });
        return { tripID: args.tripID, riderID: args.riderID, result: 'success' };
      }
      return { tripID: args.tripID, riderID: args.riderID, result: 'fail' };
    } catch (e) {
      throw e.message;
    }
  },
};
