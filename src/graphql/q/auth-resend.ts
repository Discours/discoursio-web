import { gql } from 'solid-urql'

export default gql`
  query ResendQuery($email: String!) {
    resend(email: $email) {
      error
    }
  }
`
