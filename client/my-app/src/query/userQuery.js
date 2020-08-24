import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation($newUserInput: RegisterInput) {
    register(dataUser: $newUserInput) {
      email
      password
      subsStatus
      userName
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($loginInfo: UserInput) {
    userLogin(dataUser: $loginInfo) {
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
