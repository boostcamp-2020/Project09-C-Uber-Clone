import 'dotenv/config';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

import GlobalStyle from './GlobalStyle';
import store from './store';
import App from './App';

const rootElement = document.getElementById('app');

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WEBSOCKET_URI,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle/>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  rootElement,
);
