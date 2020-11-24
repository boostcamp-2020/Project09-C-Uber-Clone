import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import store from './store';
import App from './App';

const rootElement = document.getElementById('app');

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  rootElement,
);
