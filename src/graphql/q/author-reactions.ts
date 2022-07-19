import { gql } from 'solid-urql'

export default gql`
  query ReactionsByAuthorQuery($author: String!, $page: Int!, $size: Int!) {
    userReactions(slug: $author, page: $page, size: $size) {
      id
      body
      createdAt
      updatedAt
      replyTo
      kind
      range
    }
  }
`
