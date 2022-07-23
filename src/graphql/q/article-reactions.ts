import { gql } from 'solid-urql'

export default gql`
  query ReactionsByShoutQuery($slug: String!) {
    reactionsByShout(slug: $slug) {
      id
      body
      createdAt
      createdBy {
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
