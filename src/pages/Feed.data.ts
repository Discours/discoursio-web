import { useLocation, RouteDataFunc } from 'solid-app-router'
import { useI18n } from '@solid-primitives/i18n'
import { createQuery } from 'solid-urql'
import articlesCandidates from '../graphql/q/articles-candidates'
import articlesForTopic from '../graphql/q/articles-for-topic'
import articlesForAuthor from '../graphql/q/articles-for-author'
// FIXME: import articlesTopViewed from '../graphql/q/articles-top-viewed'
import { Shout } from '../graphql/types.gen'
import { useStore } from '../store'
import topicsAll from '../graphql/q/topics-all'

export type HomeParams = {
    lang?: string
    size?: number
    page?: number
}

export interface HomeRouteData {
    candidates: Partial<Shout>[]
    byAuthors?: Partial<Shout>[]
    byTopics?: Partial<Shout>[]
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
    // FIXME: const { page, size } = paramList()
    const [{ currentUser }] = useStore()
    const [candata] = createQuery({ query: articlesCandidates })
    let afeed: Partial<Shout>[], tfeed: Partial<Shout>[]
    currentUser?.userSubscribedAuthors?.forEach((aslug: string) => {
        const [qdata] = createQuery({ query: articlesForAuthor, variables: { slug: aslug } })
        afeed.concat(qdata()?.shoutsByAuthor)
    })
    currentUser?.userSubscribedTopics?.forEach((tslug: string) => {
        const [qdata] = createQuery({ query: articlesForTopic, variables: { slug: tslug } })
        tfeed.concat(qdata()?.shoutsByTopic)
    })
    const [tdata, tstate] = createQuery({ query: topicsAll })

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
            return tfeed
        },
        get authorsFeed() {
            return afeed
        },
        get params() {
            return paramList()
        }
    } as HomeRouteData
}
