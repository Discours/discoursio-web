import { gql } from 'solid-urql'

export default gql`
  query RecentShoutsQuery($page: Int!, $size: Int!) {
    recents(page: $page, size: $size) {
      _id: slug
      title
      subtitle
      slug
      layout
      cover
      topics {
        _id: slug
        slug
        title
        body
        pic
      }
      authors {
        _id: slug
        name
        slug
        userpic
      }
      community
      mainTopic
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
