import { RouteDataFunc } from 'solid-app-router'
import articleBySlug from '../graphql/q/article-by-slug'
import articleComments from '../graphql/q/article-comments'
import { createQuery } from 'solid-urql'
import topicsAll from '../graphql/q/topics-all'

export const ArticleData: RouteDataFunc = (args) => {
  const [articleData, articleState] = createQuery({
    query: articleBySlug,
    variables: { slug: args.params.slug }
  })
  const [commentsData, commentsState] = createQuery({
    query: articleComments,
    variables: { shout: args.params.slug }
  })

  const [tdata, tstate] = createQuery({ query: topicsAll })

  return {
    get topics() {
      return tdata()?.topicsBySlugs
    },
    get topicsLoading() {
      return tstate().fetching
    },
    get slug() {
      return args.params.slug
    },
    get comments() {
      return commentsData()?.getShoutComments || []
    },
    get loadingComments() {
      return commentsState().fetching
    },
    get loading() {
      return articleState().fetching
    },
    get article() {
      return articleData()?.getShoutBySlug
    },
    get version() {
      // TODO: implement versioning
      return articleData()?.getShoutBySlug
    }
  }
}
