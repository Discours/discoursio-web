import { gql } from 'solid-urql'

export default gql`
  query GetShoutComments($shout: String!) {
    getShoutComments(slug: $shout) {
      id
      body
      createdAt
      author {
        _id: slug
        name
        slug
        userpic
      }
      updatedAt
      replyTo
      ratings {
        _id: createdBy
        value
        createdBy
      }
    }
  }
`
