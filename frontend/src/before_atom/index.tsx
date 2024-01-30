import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import NoteList from './NoteList';
import SearchForm from './SearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SearchForm />
      <NoteList />
    </ApolloProvider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
