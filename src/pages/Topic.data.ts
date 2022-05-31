import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import articlesForTopics from '../graphql/q/articles-for-topics'
import topicsAll from '../graphql/q/topics-all'

export const TopicData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const page = args.params.page || 1
  const size = args.params.size || 50
  const [data, state] = createQuery({
    query: articlesForTopics,
    variables: { slugs: [args.params.slug,], page, size }
  })
  const [tdata, tstate] = createQuery({ query: topicsAll })
  return {
    get articles() {
      return data()?.shoutsByTopics
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
    get slug() {
      return args.params.slug
    }
  }
}
