import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation ReactionMutation($reaction: ReactionInput!) {
    createReaction(reaction: $reaction) {
      error
      reaction {
        id
        createdBy { slug, name, userpic }
        body
        kind
        range
        createdAt
        shout
        replyTo { id, createdBy { slug, usepric, name }, body, kind }
      }
    }
  }
`
