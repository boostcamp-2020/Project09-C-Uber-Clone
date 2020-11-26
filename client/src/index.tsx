import 'dotenv/config';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import GlobalStyle from './GlobalStyle';
import store from './store';
import App from './App';

const rootElement = document.getElementById('app');

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
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
