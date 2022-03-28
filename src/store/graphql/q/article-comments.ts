import { gql } from 'solid-urql'

export default gql`
  query GetShoutComments($shout: String!) {
    getShoutComments(slug: $shout) {
      id
      body
      createdAt
      author {
        name
        slug
        userpic
      }
      updatedAt
      replyTo
      ratings {
        value
        createdBy
      }
    }
  }
`
