import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloLink, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import * as serviceWorker from './serviceWorker';

// create the http link for the API
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://2021-werkstuk-react-app-pgmgent-thibdema.netlify.app',
});

  // create the authentication header
  const authLink = new ApolloLink((operation, forward) => {

    const token = window.localStorage.getItem('token');
 
    // get the authentication token from local storage if it exists
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjhjMjEyNjYzM2E1NzExODBjMjA0ZjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MDMwNTA0NDEsImV4cCI6MTYwMzA1NDA0MX0.d8HQs7nZ2iutgvuxJmQChKIkLh9ri3fQj40OI0xFYjE";

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  // init apolloclient
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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