import { RouteDataFunc } from 'solid-app-router'
import articleBySlug from '../graphql/q/article-by-slug'
import articleComments from '../graphql/q/article-comments'
import { createQuery } from 'solid-urql'

export const ArticleData: RouteDataFunc = (props) => {
  const [articleData, articleState] = createQuery({
    query: articleBySlug,
    variables: { slug: props.params.slug }
  })
  const [commentsData, commentsState] = createQuery({
    query: articleComments,
    variables: { slug: props.params.slug }
  })

  return {
    get slug() {
      return props.params.slug
    },
    get comments() {
      return commentsData()
    },
    get loadingComments() {
      return commentsState().fetching
    },
    get loading() {
      return articleState().fetching
    },
    get article() {
      return articleData()
    }
  }
}
