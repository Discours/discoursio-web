import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import topRecent from '../graphql/q/articles-top-recent'
import topOverall from '../graphql/q/articles-top-rated'
import topMonth from '../graphql/q/articles-top-month'
import { Shout, Topic } from '../graphql/types.gen'
import topicsAll from '../graphql/q/topics-all'

export type HomeParams = {
  lang?: string
  size?: number
  page?: number
}

export interface HomeRouteData {
  readonly topicsdict: { [key:string]: Topic }
  readonly shoutsdict: { [key:string]: Partial<Shout> }
  topRecent: Partial<Shout>[]
  topMonth: Partial<Shout>[]
  topOverall: Partial<Shout>[]
  readonly topics: Topic[]
  readonly topicsLoading: boolean
  readonly loading: boolean
  readonly params: HomeParams
}

const START = 1

export const HomeData: RouteDataFunc = (): HomeRouteData => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): HomeParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()
    const page = location.query.page ? (parseInt(location.query.page) as number) : START
    const size = location.query.size ? (parseInt(location.query.size) as number) : 50

    return { lang, page, size }
  }
  const { page, size } = paramList()
  const [topRecentData, recentState] = createQuery({
    query: topRecent,
    variables: { page: page || START, size }
  })
  const [topMonthData, topMonthState] = createQuery({
    query: topMonth,
    variables: { page: START, size: 10 }
  })
  const [topOverallData, topOverallState] = createQuery({
    query: topOverall,
    variables: { page: START, size: 10 }
  })

  const [tdata, tstate] = createQuery({ query: topicsAll })

  return {
    get topics() {
      return tdata()?.topicsBySlugs
    },
    get topicsdict() {
      let r: {[key:string]: Topic} = {}
      tdata()?.topicsBySlugs.forEach((t: Topic) => { r[t.slug] = t })
      return r
    },
    get topicsLoading() {
      return tstate().fetching
    },
    get topRecent() {
      return topRecentData()?.recents || []
    },
    get topMonth() {
      return topMonthData()?.topMonth || []
    },
    get topOverall() {
      return topOverallData()?.topOverall || []
    },
    get loading() {
      return recentState().fetching && topMonthState().fetching && topOverallState().fetching
    },
    get params() {
      return paramList()
    },
    get shoutsdict() {
      let r: {[key:string]: Partial<Shout>} = {} as {[key:string]: Partial<Shout>}
      [
        ...Array.from(topMonthData()?.topMonth),
        ...Array.from(topOverallData()?.topOverall),
        ...Array.from(topRecentData()?.recents)
      ].forEach(s => { r[(s as Partial<Shout>).slug || ''] = s as Partial<Shout> })
      return r
    }
  } as HomeRouteData
}
