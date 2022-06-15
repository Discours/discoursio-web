import { gql } from 'solid-urql'

export default gql`
  query isEmailUsedQuery($email: String!) {
    isEmailUsed(email: $email)
  }
`
