export default {
  Query: {
    async user(parent: any, args:any, context: any, info: any) {
      const { data } = context.req.user;
      return data;
    },
  },
};
