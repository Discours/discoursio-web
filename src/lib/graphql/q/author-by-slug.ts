import { gql } from 'solid-urql'

export default gql`
  query GetUserBySlugQuery($slugs: [String]!) {
    getUsersBySlugs(slugs: $slugs) {
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
