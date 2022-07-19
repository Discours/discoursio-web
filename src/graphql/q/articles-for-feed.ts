import { gql } from 'solid-urql'

export default gql`
  query ShoutsBySessionQuery($page: Int!, $size: Int!) {
    shoutsForFeed(page: $page, size: $size) {
      _id: slug
      title
      subtitle
      layout
      slug
      cover
      # community
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
        _id: views
        views
        reacted
      }
    }
  }
`
