import { gql } from 'solid-urql'

export default gql`
    mutation CollabRemoveeMutation($author: String!, $slug: String!) {
        removeAuthor(author: $author, shout: $slug) {
            error
        }
    }
`
