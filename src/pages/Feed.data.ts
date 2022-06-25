import { RouteDataFunc } from 'solid-app-router'
import { createQuery } from 'solid-urql'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForCommunities from '../graphql/q/articles-for-communities'
import { Shout, Topic } from '../graphql/types.gen'
import { useAuth } from '../store/auth'
import topicsAll from '../graphql/q/topics-all'
import { byViews } from '../utils/sortby'
import { useZine } from '../store/zine'
import articlesRecentAll from '../graphql/q/articles-recent-all'

export interface FeedRouteData {
  candidates: Partial<Shout>[]
  byAuthors?: Partial<Shout>[]
  byTopics?: Partial<Shout>[]
  byCommunities?: Partial<Shout>[]
  recentAll: Partial<Shout>[]
  readonly topics: Topic[]
  readonly topicsBySlug: { [slug: string]: string }
  readonly topicsLoading: boolean
  readonly feedLoading: boolean
}

export const FeedData: RouteDataFunc = (): FeedRouteData => {
  const [{ info }, {}] = useAuth()
  const [talldata, tallstate] = createQuery({ query: topicsAll })
  const [{ page, size }, { more } ] = useZine()
  const topTopics: string[] | any = () => 
    Array.from(talldata()?.topicsBySlugs || [])
      .sort(byViews)
      .map((v, _i, _arr) => (v as Topic).slug)

  const [rdata, rstate] = createQuery({
    query: articlesRecentAll, 
    variables: { page, size }
  })
  const [tdata, tstate] = createQuery({
    query: articlesForTopics,
    variables: { slugs: info?.userSubscribedTopics || topTopics(), page, size }
  })

  const [adata, astate] = createQuery({
    query: articlesForAuthors,
    variables: { slugs: info?.userSubscribedAuthors || [], page, size }
    // TODO: separate pagination?
  })
  const [cdata, cstate] = createQuery({
    query: articlesForCommunities,
    variables: { slugs: info?.userSubscribedCommunities || [], page, size }
    // TODO: info about subscribed communities
    // TODO: separate pagination?
  })
  return {
    get recentAll() {
      return rdata()?.recentAll || []
    },
    get byAuthors() {
      return adata()?.shoutsByAuthors || []
    },
    get byTopics() {
      return tdata()?.shoutsByTopics || []
    },
    get byCommunities() {
      return cdata()?.shoutsByCommunities || []
    },
    get topics() {
      return talldata()?.topicsBySlugs
    },
    get topicsBySlug() {
      let bySlug = {} as { [slug: string]: Topic} 
      talldata().forEach((t: Topic) => bySlug[t.slug] = t)
      return bySlug
    },
    get topicsLoading() {
      return tallstate().fetching
    },
    get authorsFeed() {
      return adata().shoutsByAuthors
    },
    get feedLoading() {
      return rstate().fetching || tstate().fetching || astate().fetching || cstate().fetching
    }
  } as unknown as FeedRouteData
}
