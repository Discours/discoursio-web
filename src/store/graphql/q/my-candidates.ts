import { gql } from 'solid-urql'
// WARNING: need Auth header

export default gql`
  query ShoutsCandidatesQuery($page: Int!, $size: Int!) {
    shoutsCandidates(page: $page, size: $size) {
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
