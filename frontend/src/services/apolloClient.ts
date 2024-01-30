import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
