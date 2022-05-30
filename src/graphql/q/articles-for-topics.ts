import { gql } from 'solid-urql'

export default gql`
  query ShoutsForTopicsQuery($slugs: [String]!, $page: Int!, $size: Int!) {
    shoutsByTopics(slugs: $slugs, page: $page, size: $size) {
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
