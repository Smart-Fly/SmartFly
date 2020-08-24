const { gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type dataPrice {
    airline: String
    departureTime: String
    arrivalTime: String
    price: Int
    airLineLogo: String
  }

  type Price {
    Traveloka: [dataPrice!]
    Tiket: [dataPrice!]
    PegiPegi: [dataPrice!]
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
    getFlight(search: FlightInput) : Price
  }
`
const resolvers = {
  Mutation: {
    getFlight: async (_, args) => {

      let uKey = {
        dACode: args.search.dAirportCode,
        aACode: args.search.aAirportCode,
        pDate: args.search.planDate,
        cType: args.search.classType
      }
      const priceChace = await redis.get(`prices-${uKey.dACode}/${uKey.aACode}/${uKey.pDate}/${uKey.cType}`)
      if (priceChace) {
        return JSON.parse(priceChace)
      } else {
        try {
          const searchToAdd = args.search
          const addToSearch = await axios.post(`http://localhost:3003/flightPrice`, searchToAdd)
          await redis.set(`prices-${uKey.dACode}/${uKey.aACode}/${uKey.pDate}/${uKey.cType}`, JSON.stringify(addToSearch.data), 'EX', 20)
          return addToSearch.data

        } catch (err) {
          return err
        }
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
