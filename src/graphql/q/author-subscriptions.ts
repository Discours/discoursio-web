import { gql } from 'solid-urql'

export default gql`
  query UserSubscriptionsQuery($slug: String!) {
    userSubscriptions(slug: $slug) {
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
