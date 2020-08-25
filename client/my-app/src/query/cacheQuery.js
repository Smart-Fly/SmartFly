import { gql } from "@apollo/client";
import client from "../config/config";

export const GET_USER = gql`
  query {
    userLoginCache {
      userName
      subsStatus
    }
  }
`;

client.writeQuery({
  query: GET_USER,
  data: {
    userLoginCache: {
      userName: "userNameLogin",
      subsStatus: false,
    },
  },
});
