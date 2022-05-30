import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import articlesCandidates from '../graphql/q/articles-candidates'
import articlesForTopic from '../graphql/q/articles-for-topic'
import articlesForAuthor from '../graphql/q/articles-for-author'
// FIXME: import articlesTopViewed from '../graphql/q/articles-top-viewed'
import { Shout, User } from '../graphql/types.gen'
import { useStore } from '../store'
import topicsAll from '../graphql/q/topics-all'
import { createMemo } from 'solid-js'
import { byViews } from '../utils/by'

export type HomeParams = {
  lang?: string
  size?: number
  page?: number
}

export interface HomeRouteData {
  candidates: Partial<Shout>[]
  byAuthors?: Partial<Shout>[]
  byTopics?: Partial<Shout>[]
  byCommunities?: Partial<Shout>[]
  params: HomeParams
}

const START = 1

export const FeedData: RouteDataFunc = (): HomeRouteData => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): HomeParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()
    const page = location.query.page ? (parseInt(location.query.page) as number) : START
    const size = location.query.size ? (parseInt(location.query.size) as number) : 50

    return { lang, page, size }
  }
  const { page, size } = paramList()
  const [{}, { getInfo }] = useStore()
  const [tdata, tstate] = createQuery({ query: topicsAll })
  const [candata] = createQuery({ query: articlesCandidates, variables: { page, size } })

  const afeed = createMemo(() => {
    let l = [] as Partial<Shout>[]
    ;(getInfo()?.userSubscribedAuthors || []).forEach((author: Partial<User>) => {
      // TODO: set backend for slugs
      const [qdata] = createQuery({
        query: articlesForAuthor,
        variables: { slug: author?.slug, page, size }
      })
      l.concat(qdata()?.shoutsByAuthor)
    })
    return l
  })

  const loadTopic = (slug: string) => {
    if (slug) {
      const [qdata] = createQuery({ query: articlesForTopic, variables: { slug, page, size } })
      // TODO: separated pagination
      return qdata()?.shoutsByTopic
    } else return []
  }

  const topTopics = createMemo(() => {
    if (!tstate().fetching && !getInfo()?.userSubscribedTopics) {
      let tt = Array.from(tdata().topicsBySlugs).sort(byViews).slice(0, 5)
      console.debug(tt)
      return tt
    }
    return [] as string[]
  })

  const tfeed = createMemo(() => (getInfo()?.userSubscribedTopics || topTopics()).map(loadTopic))

  return {
    get topics() {
      return tdata()?.topicsBySlugs
    },
    get topicsLoading() {
      return tstate().fetching
    },
    get candidates() {
      return candata()?.candidates || []
    },
    get topicsFeed() {
      return tfeed()
    },
    get authorsFeed() {
      return afeed()
    },
    get params() {
      return paramList()
    }
  } as HomeRouteData
}
