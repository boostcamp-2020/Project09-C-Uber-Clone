interface LoginPayload{
  email:string,
  password:string
}

export default {
  Mutation: {
    loginRider: async (_: any, args:LoginPayload, context) => {
      try {
        const { user } = await context.authenticate('graphql-local', args);
        return user._id;
      } catch (e) {
        return e.message;
      }
    },
  },
};
