import { gql } from 'solid-urql'

export default gql`
  query ShoutsByAuthorQuery($author: String!, $page: Int!, $size: Int!) {
    shoutsByAuthor(author: $author, page: $page, size: $size) {
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
