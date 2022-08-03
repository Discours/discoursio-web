import { gql } from 'solid-urql'

export default gql`
  query UserFollowingQuery($slug: String!) {
    userFollowing(slug: $slug) {
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