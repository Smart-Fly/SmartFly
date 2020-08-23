const { gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql `
  type dataPrice {
    airline: String
    departureTime: String
    arrivalTime: String
    price: Int
    airLineLogo: String
  }

  type Price {
    Traveloka: [dataPrice]
    Tiket: [dataPrice]
    PegiPegi: [dataPrice]
  }


  input FlightInput {
    dAirportCode: String!
    aAirportCode: String!
    planDate: String!
    psAdult: Int!
    psChild: Int!
    psInfant: Int!
    classType: String!
  }


  extend type Mutation {
    getFlight(search: FlightInput) : [Price]
  }
`

const resolvers = {
  Mutation: {
    getFlight: async (_,args) => {
      try {
        const searchToAdd = args.search
        const addToSearch = await axios.post(`http://localhost:3003/flightPrice`, searchToAdd)
        return addToSearch.data
      } catch (error) {
        return error
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
