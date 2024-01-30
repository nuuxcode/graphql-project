import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create an Apollo Client instance
console.log(process.env)
console.log(process.env.NODE_ENV)
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});

export default client;
