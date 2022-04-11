import { gql } from 'solid-urql'

export default gql`
  query GetShoutBySlugQuery($slug: String!) {
    getShoutBySlug(slug: $slug) {
      title
      subtitle
      layout
      cover
      community
      body
      authors {
        id
        name
        slug
        userpic
      }
      mainTopic
      topics {
        slug
        title
        body
        pic
      }
      createdAt
      updatedAt
      publishedAt
      ratings {
        value
        rater
      }
      stat {
        views
      }
    }
  }
`
