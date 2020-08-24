const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Login {
    access_token: String
  }

  type User {
    email: String
    password: String
    subsStatus: Boolean
    userName: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    userName: String!
    subsStatus: Boolean!
  }

  input UpdateSubs {
    subsStatus: Boolean!
    access_token: String!
  }

  extend type Mutation {
    userLogin(dataUser: UserInput): Login
    register(dataUser: RegisterInput): User
    googleLogin(idToken: String): Login
    updateSubscription(dataUser: UpdateSubs): User
  }
`;

const resolvers = {
  Mutation: {
    userLogin: async (_, args) => {
      try {
        const user = args.dataUser;
        const login = await axios.post(`http://localhost:3001/login`, user);
        return login.data;
      } catch (error) {
        return error;
      }
    },
    register: async (_, args) => {
      try {
        const user = args.dataUser;
        const register = await axios.post(
          `http://localhost:3001/register`,
          user
        );
        return register.data;
      } catch (error) {
        return error;
      }
    },
    googleLogin: async (_, args) => {
      try {
        const id = args.idToken;
        const login = await axios.post(`http://localhost:3001/googleSignIn`, {
          idToken: id,
        });
        return login.data;
      } catch (error) {
        return error;
      }
    },
    updateSubscription: async (_, args) => {
      try {
        const subsStatus = args.dataUser.subsStatus;
        const access_token = args.dataUser.access_token;
        const updated = await axios.put(
          `http://localhost:3001/promotion`,
          { subsStatus },
          { 'headers': { 'access_token': access_token } }
        );
        return updated.data.data;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
