import { gql } from 'solid-urql'

export default gql`
    query ReactionsAllQuery($page: Int! $size: Int!) {
        reactionsAll(page: $page, size: $size) {
            id
            createdBy { slug, name, userpic }
            body
            kind
            createdAt
            updatedAt
            shout { slug, title }
            replyTo { id, createdBy { slug, userpic, name }, body, kind }
      }
    }
`
