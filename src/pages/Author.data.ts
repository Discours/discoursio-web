import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import authorArticles from '../graphql/q/articles-for-authors'
import topicsAll from '../graphql/q/topics-all'
import authorsBySlugs from '../graphql/q/authors-by-slugs'

export const AuthorData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): { lang: string } => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()

    return { lang }
  }

  const [authorData, authorState] = createQuery({
    query: authorsBySlugs,
    variables: { slugs: [args.params.slug] }
  })

  const page = args.params.page || 1
  const size = args.params.size || 50
  const [adata, astate] = createQuery({
    query: authorArticles,
    variables: {
      author: args.params.slug,
      page,
      size
    }
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
      return adata()?.shoutsByAuthor
    },
    get articlesLoading() {
      return astate()?.fetching
    },
    get params() {
      return paramList
    },
    get author() {
      return authorData()?.getUsersBySlugs[0]
    },
    get authorLoading() {
      return authorState()?.fetching
    }
  }
}
