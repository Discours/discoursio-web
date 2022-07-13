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
      community
      mainTopic
      topics {
        _id: slug
        slug
        title
        body
        pic
        stat {
          _id: views
          shouts
          authors
          views
          subscriptions
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
        _id: views
        views
        comments
        ratings
      }
    }
  }
`
