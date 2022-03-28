import { gql } from 'solid-urql'

// WARNING: need Auth header

export default gql`
  query SignOutQuery {
    signOut {
      error
    }
  }
`
