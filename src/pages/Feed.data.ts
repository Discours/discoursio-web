import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import articlesCandidates from '../graphql/q/articles-candidates'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesForAuthors from '../graphql/q/articles-for-authors'
// FIXME: import articlesTopViewed from '../graphql/q/articles-top-viewed'
import { Shout, Topic } from '../graphql/types.gen'
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
  
  const [talldata, tallstate] = createQuery({ query: topicsAll })
  const [candata] = createQuery({ query: articlesCandidates, variables: { page, size } })
  
  const topTopics: string[] | any = createMemo(() => 
    !tallstate().fetching && 
    !getInfo()?.userSubscribedTopics && 
    Array.from(talldata().topicsBySlugs).sort(byViews).map(((v, _i, _arr) => (v as Topic).slug))
  )

  const [tdata, tstate] = createQuery({ 
    query: articlesForTopics, 
    variables: { slugs: getInfo()?.userSubscribedTopics || topTopics(), page, size } 
  })

  const [adata, astate] = createQuery({ 
    query: articlesForAuthors, 
    variables: { slugs: getInfo()?.userSubscribedAuthors || [], page, size } // TODO: separate pagination?
  })

  return {
    get topics() {
      return talldata()?.topicsBySlugs
    },
    get topicsLoading() {
      return tallstate().fetching
    },
    get candidates() {
      return candata()?.candidates || []
    },
    get topicsFeed() {
      return tdata().shoutsByTopics
    },
    get authorsFeed() {
      return adata().shoutsByAuthors
    },
    get feedLoading() {
      return tstate().fetching && astate().fetching
    },
    get params() {
      return paramList()
    }
  } as HomeRouteData
}
