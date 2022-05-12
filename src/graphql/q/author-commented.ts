import { gql } from 'solid-urql'

// WARNING: need Auth header

export default gql`
  query ShoutsCommentedByUserQuery($slug: String!, $page: Int!, $size: Int!) {
    shoutsCommentedByUser(slug: String!, page: Int!, size: Int!) {
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
