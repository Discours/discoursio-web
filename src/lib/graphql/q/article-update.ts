import { gql } from 'solid-urql'
import { Shout } from '../types.gen'

export default gql`
  mutation ArticleMutation($article: Shout!) {
    updateArticle(article: $article) {
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
