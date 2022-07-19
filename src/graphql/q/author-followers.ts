import { gql } from 'solid-urql'

export default gql`
  query UserSubscribersQuery($slug: String!) {
    userSubcribers(slug: $slug) {
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
