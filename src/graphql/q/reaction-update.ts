import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation ReactionMutation($reaction: ReactionInput!) {
    updateReaction(reaction: $reaction) {
      error
      reaction {
        id
        createdBy { slug, name, userpic }
        body
        kind
        range
        createdAt
        updatedAt
        shout
        replyTo { id, createdBy { slug, userpic, name }, body, kind }
      }
    }
  }
`
