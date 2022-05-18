import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import authorArticles from '../graphql/q/articles-for-author'
import topicsAll from '../graphql/q/topics-all'
import authorBySlug from '../graphql/q/author-by-slug'

export const AuthorData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): { lang: string } => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()

    return { lang }
  }

  const [authorData, authorState] = createQuery({ query: authorBySlug, variables: { slug: args.params.slug }})

  const [authorArticlesData, stauthorArticlesState] = createQuery({
    query: authorArticles,
    variables: { topic: args.params.slug }
  })

  const [tdata, tstate] = createQuery({ query: topicsAll })

  return {
    get topics() {
        return tdata()?.topicsBySlugs
    },
    get topicsLoading() {
        return tstate()?.fetching
    },
    get articles() {
      return authorArticlesData()?.shoutsByAuthor
    },
    get articlesLoading() {
      return stauthorArticlesState()?.fetching
    },
    get params() {
      return paramList
    },
    get author() {
      return authorData()?.authorBySlug
    },
    get authorLoading() {
      return authorState()?.fetching
    }
  }
}
