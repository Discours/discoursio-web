import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import topRecent from '../graphql/q/top-recent'
import topOverall from '../graphql/q/top-overall'
import topMonth from '../graphql/q/top-month'
import { Shout } from '../graphql/types.gen'

export type HomeParams = {
  lang?: string
}

export interface HomeRouteData {
  // topics: { [key: string]: Partial<Topic> }
  // authors: { [key: string]: Partial<User> }
  topRecent: Partial<Shout>[]
  topMonth: Partial<Shout>[]
  topOverall: Partial<Shout>[]
  loading: boolean
  params: HomeParams
}

export const HomeData: RouteDataFunc = (): HomeRouteData => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const paramList = (): HomeParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale()

    return { lang }
  }
  const [topRecentData, recentState] = createQuery({ query: topRecent })
  const [topMonthData, topMonthState] = createQuery({ query: topMonth })
  const [topOverallData, topOverallState] = createQuery({ query: topOverall })

  return {
    get topRecent() {
      return topRecentData()
    },
    get topMonth() {
      return topMonthData()
    },
    get topOverall() {
      return topOverallData()
    },
    get loading() {
      return recentState().fetching && topMonthState().fetching && topOverallState().fetching
    },
    get params() {
      return paramList()
    }
  } as HomeRouteData
}
