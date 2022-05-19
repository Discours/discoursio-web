import { gql } from 'solid-urql'

export default gql`
  query ShoutsByTopicQuery($topic: String!, $page: Int!, $size: Int!) {
    shoutsByTopic(topic: $topic, page: $page, size: $size) {
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
