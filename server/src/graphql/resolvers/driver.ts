import { Driver } from '../../services';

interface createDriverArgs {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  carType: string;
  plateNumber: string;
  description: string;
  profileImage: string;
}

export default {
  Query: {
    async driver(parent: any, args: { email: string }, context: any, info: any) {
      return await Driver.getDriverInfo({ email: args.email });
    },
  },
  Mutation: {
    async createDriver(parent: any, args: createDriverArgs, context: any, info: any) {
      return await Driver.signup({ ...args });
    },
  },
};
