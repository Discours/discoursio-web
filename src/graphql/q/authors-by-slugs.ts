import { gql } from 'solid-urql'

export default gql`
  query GetAuthorsBySlugQuery($slugs: [String]!) {
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
        rater
        value
      }
    }
  }
`
