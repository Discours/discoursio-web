import { gql } from 'solid-urql'
import { Shout } from '../types.gen'

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
