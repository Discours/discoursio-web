import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import authorArticles from '../graphql/q/author-articles'

export type AuthorParams = {
  lang: string
}

export const AuthorData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): AuthorParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()

    return { lang }
  }
  const [authorArticlesData, stauthorArticlesState] = createQuery({
    query: authorArticles,
    variables: { topic: args.params.slug }
  })

  return {
    get getArticles() {
      return authorArticlesData()
    },
    get loading() {
      return stauthorArticlesState().fetching
    },
    get version() {
      return ''
    },
    get params() {
      return paramList
    }
  }
}
