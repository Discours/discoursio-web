import { gql } from 'solid-urql'

// TODO: sync with backend

export default gql`
  mutation ArticleMutation($article: Shout!) {
    createArticle(article: $article) {
      error
      shout {
        slug
        title
        subtitle
        image
        body
        topics {
          title
          slug
          image
        }
        authors {
          slug
          username
          userpic
        }
      }
    }
  }
`
