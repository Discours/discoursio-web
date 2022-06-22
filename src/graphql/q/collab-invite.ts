import { gql } from 'solid-urql'

export default gql`
    mutation CollabInviteMutation($author: String!, $slug: String!) {
        inviteAuthor(author: $author, shout: $slug) {
            error
        }
    }
`
