import { gql } from 'solid-urql'
import { Shout } from '../types.gen'

// TODO: sync with backend

export default gql`
  mutation CommentMutation($comment_id: Int!) {
    destroyComment(comment: $comment_id) {
      error
    }
  }
`
