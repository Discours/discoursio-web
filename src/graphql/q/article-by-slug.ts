import { gql } from 'solid-urql'

export default gql`
  query GetShoutBySlugQuery($slug: String!) {
    getShoutBySlug(slug: $slug) {
      _id: slug
      slug
      title
      subtitle
      layout
      cover
      # community
      body
      authors {
        id
        name
        slug
        userpic
      }
      mainTopic
      topics {
        _id: slug
        slug
        title
        body
        pic
      }
      createdAt
      updatedAt
      publishedAt
      stat {
        _id: views
        views
        reacted
      }
    }
  }
`
