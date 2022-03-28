import { gql } from 'solid-urql'
import { Shout } from '../types.gen'

// TODO: sync with backend

export default gql`
  mutation ArticleMutation($article_id: Int!) {
    destroyArticle(article: $article_id) {
      error
    }
  }
`
