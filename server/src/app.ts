import 'dotenv/config';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';
import { buildContext } from 'graphql-passport';

import typeDefs from './graphql/typeDef';
import resolvers from './graphql/resolvers';
import { localStrategy } from './passport/local';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URL || '', options)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const app = express();
app.use(passport.initialize());
localStrategy();

const authenticationResolver = ['loginQuery', 'signupQuery'];
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => {
  console.log(req.body);
  if (authenticationResolver.includes(req.body.operationName)) {
    console.log('login');
    return buildContext({ req, res });
  }
  if (!req.headers.authorization) {
    throw new AuthenticationError('missing token');
  }
} });

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`),
);
