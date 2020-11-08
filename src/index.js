import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloLink, ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import * as serviceWorker from './serviceWorker';

import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import 'bootstrap/dist/js/bootstrap';

// create the http link for the API
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://werkstuk-graphql-api-pgm4-2021.herokuapp.com/',
});

const wsLink = new WebSocketLink({
  uri: 
  process.env.NODE_ENV === 'development'
    ? `ws://localhost:4000/graphql`
    : 'wss://werkstuk-graphql-api-pgm4-2021.herokuapp.com/graphql',
  options: {
    reconnect: true,
  }
});

// create the authentication header
const authLink = new ApolloLink((operation, forward) => {

  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

// init apolloclient
const client = new ApolloClient({
  link,
  // uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();