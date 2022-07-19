import { gql } from 'solid-urql'

export default gql`
  query getShoutReactions($shout: String!) {
    getShoutReactions(slug: $shout) {
      id
      body
      createdAt
      author {
        _id: slug
        name
        slug
        userpic
      }
      updatedAt
      replyTo
      kind
      range
    }
  }
`
