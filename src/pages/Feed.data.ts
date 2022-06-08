import { RouteDataFunc } from 'solid-app-router'
import { createQuery } from 'solid-urql'
import articlesCandidates from '../graphql/q/articles-candidates'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForCommunities from '../graphql/q/articles-for-communities'
// FIXME: import articlesTopViewed from '../graphql/q/articles-top-viewed'
import { Shout, Topic } from '../graphql/types.gen'
import { useAuth } from '../store/auth'
import topicsAll from '../graphql/q/topics-all'
import { createMemo } from 'solid-js'
import { byViews } from '../utils/by'
import { useZine } from '../store/zine'

export interface FeedRouteData {
  candidates: Partial<Shout>[]
  byAuthors?: Partial<Shout>[]
  byTopics?: Partial<Shout>[]
  byCommunities?: Partial<Shout>[]
}
export interface HomeRouteData {
  topRecent: Partial<Shout>[]
  topMonth: Partial<Shout>[]
  topOverall: Partial<Shout>[]
  readonly topics: Topic[]
  readonly topicsBySlug: { [slug: string]: string }
  readonly topicsLoading: boolean
  readonly loading: boolean
  readonly feedLoading: boolean
}

export const FeedData: RouteDataFunc = (): FeedRouteData => {
  const [{ info }, {}] = useAuth()
  const [talldata, tallstate] = createQuery({ query: topicsAll })
  const [{ page, size }, { more } ] = useZine()
  const [candata] = createQuery({ query: articlesCandidates, variables: { page, size } })
  const topTopics: string[] | any = createMemo(
    () =>
      !tallstate().fetching &&
      !info?.userSubscribedTopics &&
      Array.from(talldata().topicsBySlugs)
        .sort(byViews)
        .map((v, _i, _arr) => (v as Topic).slug)
  )

  const [tdata, tstate] = createQuery({
    query: articlesForTopics,
    variables: { slugs: info?.userSubscribedTopics || topTopics(), page, size }
  })

  const [adata, astate] = createQuery({
    query: articlesForAuthors,
    variables: { slugs: info?.userSubscribedAuthors || [], page, size }
    // TODO: separate pagination?
  })
  /*
  const [cdata, cstate] = createQuery({
    query: articlesForCommunities,
    variables: { slugs: info?.userSubscribedCommunities || [], page, size }
    // TODO: info about subscribed communities
    // TODO: separate pagination?
  })
  */
  return {
    get byAuthors() {
      return adata()?.shoutsByAuthors || []
    },
    get byTopics() {
      return tdata()?.shoutsByTopics || []
    },/*
    get byCommunities() {
      return cdata()?.shoutsByCommunities || []
    },*/
    get candidates() {
      return candata()?.candidates || []
    },
    get topics() {
      return talldata()?.topicsBySlugs
    },
    get topicsBySlug() {
      let bySlug = {} as { [slug:string]: Topic }
      talldata().forEach((t: Topic) => bySlug[t.slug] = t)
      return bySlug
    },
    get topicsLoading() {
      return tallstate().fetching
    },
    get topicsFeed() {
      return tdata().shoutsByTopics
    },
    get authorsFeed() {
      return adata().shoutsByAuthors
    },
    get feedLoading() {
      return tstate().fetching && astate().fetching // && cstate().fetching
    }
  } as FeedRouteData
}
