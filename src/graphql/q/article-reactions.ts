import { gql } from 'solid-urql'

export default gql`
  query ReactionsByShoutQuery($shout: String!) {
    reactionsByShout(slug: $shout) {
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
      replyTo { id }
      kind
      range
    }
  }
`
