import { gql } from 'solid-urql'

export default gql`
  query ReactionsByAuthorQuery($author: String!, $page: Int!, $size: Int!) {
    reactionsByAuthor(slug: $author, page: $page, size: $size) {
      id
      body
      createdAt
      updatedAt
      replyTo { id, createdBy { slug, userpic, name }, body, kind }
      kind
      range
    }
  }
`
