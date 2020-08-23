const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const userSchema = require("./schemas/userSchema")
const predictionSchema = require("./schemas/predictionSchema")

const typeDefs = gql `
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, predictionSchema.typeDefs, userSchema.typeDefs],
  resolvers: [predictionSchema.resolvers, userSchema.resolvers],
})


const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
