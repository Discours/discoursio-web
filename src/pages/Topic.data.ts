import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import articlesForTopics from '../graphql/q/articles-for-topics'
import topicsAll from '../graphql/q/topics-all'
import { useZine } from '../store/zine'

export const TopicData: RouteDataFunc = (args) => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const [{ page, size }, { more }] = useZine()
  // TODO: topic's articles pagination
  const [data, state] = createQuery({
    query: articlesForTopics,
    variables: { slugs: [args.params.slug], page, size }
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
