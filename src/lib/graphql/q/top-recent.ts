import { gql } from 'solid-urql'

export default gql`
  query RecentShoutsQuery($page: Int!, $size: Int!) {
    recents(page: $page, size: $size) {
      title
      subtitle
      slug
      layout
      cover
      authors {
        name
        slug
        userpic
      }
      community
      mainTopic
      topics {
        slug
        title
        body
        pic
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
