import { gql } from 'solid-urql'

export default gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      error
      token
      user {
        name
        slug
        userpic
        bio
        # links
      }
    }
  }
`
