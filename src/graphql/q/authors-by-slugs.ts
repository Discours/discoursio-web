import { gql } from 'solid-urql'

export default gql`
  query GetAuthorsBySlugsQuery($slugs: [String]!) {
    getUsersBySlugs(slugs: $slugs) {
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
