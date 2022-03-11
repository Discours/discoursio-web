import { gql } from 'solid-urql'

export default gql`
  query UserSubscriptionsQuery($slug: String!) {
    userSubscriptions(slug: $slug) {
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
