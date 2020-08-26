import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const userCache = makeVar();

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Person: {
        // Every person type
        fields: {
          userLoginCache: {
            // A field on the person type
            read() {
              // when it's read
              return userCache();
            },
          },
        },
      },
    },
  }),
});

export default client;
