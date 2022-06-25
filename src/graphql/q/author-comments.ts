import { gql } from 'solid-urql'

export default gql`
  query CommentsByAuthorQuery($author: String!, $page: Int!, $size: Int!) {
    userComments(author: $author, page: $page, size: $size) {
      id
      body
      createdAt
      updatedAt
      replyTo
      ratings {
        _id: createdBy
        value
        createdBy
      }
    }
  }
`
