export default {
  Query: {
    async user(parent: any, args:any, context: any, info: any) {
      const { data } = context.req.user;
      return data;
    },
    async verifyUser(parent: any, args: {}, context: any, info: any) {
      return { role: context.req.user ? context.req.user.isDriver ? 'driver' : 'rider' : '' };
    },
  },
};
