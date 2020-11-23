import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDef';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URL || '', options)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`),
);
