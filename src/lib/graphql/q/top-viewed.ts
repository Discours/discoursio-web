import { gql } from 'solid-urql'

export default gql`
  query TopViewedShoutsQuery($page: Int!, $size: Int!) {
    topViewed(page: $page, size: $size) {
      title
      subtitle
      slug
      layout
      cover
      community
      mainTopic
      topics {
        slug
        title
        body
        pic
      }
      authors {
        name
        slug
        userpic
      }
      publishedAt
      stat {
        views
        comments
        ratings
      }
    }
  }
`
