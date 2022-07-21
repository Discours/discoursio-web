import { gql } from 'solid-urql'

export default gql`
  query ShoutsForCommunitiesQuery($slugs: [String]!, $page: Int!, $size: Int!) {
    shoutsByCommunities(slugs: $slugs, page: $page, size: $size) {
      _id: slug
      title
      subtitle
      layout
      slug
      cover
      # community { ... }
      mainTopic
      topics {
        _id: slug
        slug
        title
        body
        pic
        stat {
          _id: viewed
          shouts
          authors
          viewed
          followers
        }
      }
      authors {
        _id: slug
        name
        slug
        userpic
      }
      publishedAt
      stat {
        _id: viewed
        viewed
        reacted
      }
    }
  }
`
