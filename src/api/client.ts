import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mma3.onrender.com', // Your backend URL
  cache: new InMemoryCache(),
});

export default client;
