import { gql } from 'solid-urql'

export default gql`
  query ShoutsForAuthorsQuery($slugs: [String]!, $page: Int!, $size: Int!) {
    shoutsByAuthors(slugs: $slugs, page: $page, size: $size) {
      _id: slug
      title
      subtitle
      layout
      slug
      cover
      # community
      mainTopic
      topics {
        _id: slug
        slug
        title
        body
        pic
        stat {
          _id: views
          shouts
          authors
          views
          followers
        }
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
        reacted
      }
    }
  }
`
