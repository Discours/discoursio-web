import { gql } from 'solid-urql'

// NOTE: what can be followed: author, commenter, liker, community

export default gql`
  query FollowQuery($what: String!, $slug: String!) {
    follow(what: $what, slug: $slug) {
      error
    }
  }
`
