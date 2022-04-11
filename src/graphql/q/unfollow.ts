import { gql } from 'solid-urql'

export default gql`
  query UnfollowQuery($what: String!, $slug: String!) {
    unfollow(what: $what, slug: $slug) {
      error
    }
  }
`
