import { gql } from 'solid-urql'

export default gql`
  query SignInQuery($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      error
      token
      user {
        name
        slug
        userpic
      }
    }
  }
`
