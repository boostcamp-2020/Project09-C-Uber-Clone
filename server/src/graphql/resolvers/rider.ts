import { Rider } from '../../services';

interface LoginPayload{
  email:string,
  password:string
}

export default {
  Mutation: {
    async loginRider(_: any, payload:LoginPayload, context) {
      return await Rider.login(context, payload);
    },
  },
};
