export default {
  Query: {
    async verifyUser(parent: any, args: {}, context: any, info: any) {
      return { role: context.req.user ? context.req.user.isDriver ? 'driver' : 'rider' : '' };
    },
  },
};
