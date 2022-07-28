import { gql } from 'solid-urql'

export default gql`
  query AuthorssAllQuery {
    authorsAll {
      _id: slug
      slug
      name
      bio
      userpic
      communities
      links
      createdAt
      wasOnlineAt
      ratings {
        _id: rater
        rater
        value
      }
    }
  }
`
