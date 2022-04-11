import { gql } from 'solid-urql'

export default gql`
  query ShoutsByTopicQuery($topic: String!, $page: Int!, $size: Int!) {
    shoutsByTopic(topic: $topic, page: $page, size: $size) {
      title
      subtitle
      layout
      slug
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
