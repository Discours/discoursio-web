import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation CommentMutation($comment: Comment!) {
    createComment(comment: $comment) {
      error
      comment {
        id
        createdBy
        body
        createdAt
        shout
        replyTo
      }
    }
  }
`
