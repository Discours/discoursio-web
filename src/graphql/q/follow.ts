import { gql } from 'solid-urql'

// NOTE: what can be followed: author, commenter, liker, community

export default gql`
  mutation FollowQuery($what: String!, $slug: String!) {
    subscribe(what: $what, slug: $slug) {
      error
    }
  }
`
