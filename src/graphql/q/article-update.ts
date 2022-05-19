import { gql } from 'solid-urql'

export default gql`
  mutation ArticleMutation($article: Shout!) {
    updateArticle(article: $article) {
      error
      shout {
        _id: slug
        slug
        title
        subtitle
        image
        body
        topics {
          _id: slug
          title
          slug
          image
        }
        authors {
          _id: slug
          slug
          username
          userpic
        }
      }
    }
  }
`
