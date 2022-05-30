import { gql } from 'solid-urql'

export default gql`
  query ResendQuery($email: String!) {
    reset(email: $email) {
      error
    }
  }
`
