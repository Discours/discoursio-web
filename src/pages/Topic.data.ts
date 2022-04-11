import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import topicArticles from '../graphql/q/topic-articles'

export type TopicParams = {
  lang: string
}

export const TopicData: RouteDataFunc = (props) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): TopicParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()

    return { lang }
  }
  const [data, state] = createQuery({ query: topicArticles, variables: { topic: props.params.slug } })

  return {
    get getArticles() {
      return data()
    },
    get loading() {
      return state().fetching
    },
    get version() {
      return ''
    },
    get params() {
      return paramList
    }
  }
}
