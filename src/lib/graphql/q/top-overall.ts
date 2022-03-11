import { gql } from 'solid-urql'

export default gql`
  query TopOverallShoutsQuery($page: Int!, $size: Int!) {
    topOverall(page: $page, size: $size) {
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
