import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation($newUserInput: RegisterInput) {
    register(dataUser: $newUserInput) {
      email
      subsStatus
      userName
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($loginInfo: UserInput) {
    userLogin(dataUser: $loginInfo) {
      access_token
      subsStatus
      userName
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation($tokenFromGoogle: String) {
    googleLogin(idToken: $tokenFromGoogle) {
      access_token
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation($updateData: UpdateSubs) {
    updateSubscription(dataUser: $updateData) {
      email
      password
      subsStatus
    }
  }
`;
