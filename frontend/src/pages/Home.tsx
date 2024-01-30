import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../services/apolloClient';
import SearchNotes from '../components/organisms/SearchNotes';
import NoteList from '../components/organisms/NoteList';

const Home: React.FC = () => (
  <ApolloProvider client={client}>
    <SearchNotes />
    <NoteList />
  </ApolloProvider>
);

export default Home;
