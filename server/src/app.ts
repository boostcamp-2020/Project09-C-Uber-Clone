import 'dotenv/config';
import express from 'express';
import http from 'http';
import { ApolloServer, AuthenticationError, PubSub } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';
import { buildContext } from 'graphql-passport';

import verifyToken from './utils/verifyToken';
import typeDefs from './graphql/typeDef';
import resolvers from './graphql/resolvers';
import { localStrategy, jwtStrategy } from './passport';
import IsAuthorizedDirective from './graphql/directives/auth';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URL || '', options)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthorized: IsAuthorizedDirective,
  },
  context: ({ req, res, connection }) => {
    if (connection) {
      return { data: connection.context, pubsub };
    }
    return buildContext({ req, res, pubsub });
  },
  subscriptions: {
    onConnect: async (connectionParams:{Authorization?:string}, webSocket, context) => {
      const { Authorization } = connectionParams;
      const token = Authorization?.split('Bearer ')[1];
      if (token) {
        const { data, isDriver } = await verifyToken(token);
        return { currentUser: { data, isDriver } };
      }
      throw new AuthenticationError('Missing token');
    },
    onDisconnect: (webSocket, context) => {
      console.log('disconnected');
    },
  } });

const app = express();
const path = '/graphql';

localStrategy();
jwtStrategy();

app.use(path, passport.initialize());
app.use(path, (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, info) => {
    if (info) {
      req.user = info;
    }
    next();
  })(req, res, next));

server.applyMiddleware({ app, path });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});
