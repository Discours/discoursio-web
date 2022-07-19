import { gql } from 'solid-urql'

export default gql`
  query TopicsByCommunityQuery ($community: String!) {
    topicsByCommunity(community: $community) {
      title
      body
      slug
      pic
      parents
      children
      # community
      stat {
        _id: views
        shouts
        authors
        views
        followers
      }
    }
  }
`
