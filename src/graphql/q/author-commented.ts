import { gql } from 'solid-urql'

// WARNING: need Auth header

export default gql`
  query ShoutsCommentedByUserQuery($slug: String!, $page: Int!, $size: Int!) {
    shoutsCommentedByUser(slug: String!, page: Int!, size: Int!) {
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
