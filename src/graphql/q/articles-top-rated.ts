import { gql } from 'solid-urql'

export default gql`
  query TopOverallShoutsQuery($page: Int!, $size: Int!) {
    topOverall(page: $page, size: $size) {
      _id: slug
      title
      subtitle
      slug
      layout
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
