import { Rider } from '../../services';

interface LoginPayload{
  email:string,
  password:string
}

export default {
  Query: {
    rider: () => 'Hello Rider',
  },
  Mutation: {
    loginRider:
      async (_: any, payload:LoginPayload, context) =>
        await Rider.login(context, payload),
  },
};
