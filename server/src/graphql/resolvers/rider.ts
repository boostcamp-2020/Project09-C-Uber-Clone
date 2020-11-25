import { Rider } from '../../services';

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

export default {
  Mutation: {
    loginRider:
      async (_: any, payload:LoginPayload, context) =>
        await Rider.login(context, payload),
    createRider:
      async (parent: any, payload: createRiderArgs, context: any) =>
        await Rider.signup(payload),
  },
};
