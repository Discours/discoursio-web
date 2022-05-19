import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import topicArticles from '../graphql/q/articles-for-topic'
import topicsAll from '../graphql/q/topics-all'

export const TopicData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const [data, state] = createQuery({ query: topicArticles, variables: { topic: args.params.slug } })
  const [tdata, tstate] = createQuery({ query: topicsAll })
  return {
    get articles() {
      return data()?.shoutsByTopic
    },
    get loading() {
      return state()?.fetching
    },
    get topics() {
      return tdata()?.topicsBySlugs
    },
    get topicsLoading() {
      return tstate()?.fetching
    },
    get lang() {
      return location.query.locale ? (location.query.locale as string) : locale()
    },
    get page() {
      return parseInt(args.params.page) || 0
    },
    get size() {
      return 50
    },
    get slug() {
      return args.params.slug
    }
  }
}
