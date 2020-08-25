const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const userSchema = require("./schemas/userSchema");
const predictionSchema = require("./schemas/predictionSchema");
const flightSchema = require("./schemas/flightSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    predictionSchema.typeDefs,
    userSchema.typeDefs,
    flightSchema.typeDefs,
  ],
  resolvers: [
    predictionSchema.resolvers,
    userSchema.resolvers,
    flightSchema.resolvers,
  ],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀 Apollo Server ready at ${url}`);
});
