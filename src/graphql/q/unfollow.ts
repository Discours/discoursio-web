import { gql } from 'solid-urql'

export default gql`
  mutation UnfollowQuery($what: String!, $slug: String!) {
    unsubscribe(what: $what, slug: $slug) {
      error
    }
  }
`
