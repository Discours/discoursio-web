import { gql } from 'solid-urql'

export default gql`
  mutation FollowQuery($what: String!, $slug: String!) {
    follow(what: $what, slug: $slug) {
      error
    }
  }
`
