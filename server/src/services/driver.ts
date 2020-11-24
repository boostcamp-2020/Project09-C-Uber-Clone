import { Driver } from '../repositories';

export default {
  signup: async (payload) => {
    try {
      const driver = await Driver.create(payload);
      return driver;
    } catch (e) {
      throw e.message;
    }
  },
  getDriverInfo: async (payload) => {
    try {
      const driver = await Driver.findByEmail(payload);
      return driver;
    } catch (e) {
      throw e.message;
    }
  },
};
