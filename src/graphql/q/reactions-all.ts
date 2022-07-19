import { gql } from 'solid-urql'

export default gql`
    query ReactionsAllQuery($size: Int! $page: Int!) {
        reactionsAll(page: $page, size: $size) {
            id
            createdBy { slug, name, userpic }
            body
            kind
            createdAt
            updatedAt
            shout { slug, title }
            replyTo { id, createdBy { slug, usepric, name }, body, kind }
      }
    }
`
