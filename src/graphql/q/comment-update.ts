import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation CommentMutation($comment: Comment!) {
    updateComment(comment: $comment) {
      error
      comment {
        id
        author
        body
        createdAt
        updatedAt
        shout
        replyTo
      }
    }
  }
`
