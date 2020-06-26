import gql from "graphql-tag"

export const LOGIN = gql`
  mutation login($user: UsersPermissionsLoginInput!) {
    login(input: $user) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`
