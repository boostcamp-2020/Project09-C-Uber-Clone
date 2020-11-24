export default {
  Mutation: {
    loginRider: async (_: any, args, context) => {
      try {
        const { user } = await context.authenticate('graphql-local', args);
        return user._id;
      } catch (e) {
        return e.message;
      }
    },
  },
};
