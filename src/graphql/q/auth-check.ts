import { gql } from 'solid-urql'

export default gql`
  query isEmailFreeQuery($email: String!) {
    isEmailFree(email: $email) {
      error
    }
  }
`
