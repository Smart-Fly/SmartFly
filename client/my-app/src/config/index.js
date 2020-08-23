import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
export const flightItems = makeVar([])


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export default client
