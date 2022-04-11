import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation CommentMutation($comment_id: Int!) {
    destroyComment(comment: $comment_id) {
      error
    }
  }
`
