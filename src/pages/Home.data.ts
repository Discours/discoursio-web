import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import topRecent from '../graphql/q/top-recent'
import topOverall from '../graphql/q/top-overall'
import topMonth from '../graphql/q/top-month'

export type HomeParams = {
  lang?: string
}

export const HomeData: RouteDataFunc = () => {
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
      return paramList
    }
  }
}
