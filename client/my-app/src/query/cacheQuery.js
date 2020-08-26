import { gql } from "@apollo/client";
import client from "../config/config";

export const GET_CACHE_USER = gql`
  query {
    cacheUser {
      userNameCache
      subsStatusCache
    }
  }
`;

client.writeQuery({
  query: GET_CACHE_USER,
  data: {
    cacheUser: {
      userNameCache: "",
      subsStatusCache: false,
    },
  },
});
