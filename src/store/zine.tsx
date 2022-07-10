
import { createContext, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { RouteDataFuncArgs, useLocation } from 'solid-app-router'
import { useClient, Client } from 'solid-urql'
import { useI18n } from '@solid-primitives/i18n'
import { Shout, User } from '../graphql/types.gen'
import { useAuth } from './auth'
import { usePromiseQuery } from '../utils/promiseQuery'
import { byViews } from '../utils/sortby'
// all zine queries
import topicsAll from '../graphql/q/topics-all'
import articlesRecentPublished from '../graphql/q/articles-recent-published'
import articlesRecentAll from '../graphql/q/articles-recent-all'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesForCommunities from '../graphql/q/articles-for-communities'
import articlesTopMonth from '../graphql/q/articles-top-month'
import articlesTopRated from '../graphql/q/articles-top-rated'
import articleCreate from '../graphql/q/article-create'
import followQuery from '../graphql/q/follow'
import unfollowQuery from '../graphql/q/unfollow'
import articleUpdate from '../graphql/q/article-update'
import articleDestroy from '../graphql/q/article-destroy'
import commentCreate from '../graphql/q/comment-create'
import commentUpdate from '../graphql/q/comment-update'
import commentDestroy from '../graphql/q/comment-destroy'
import authorsBySlugs from '../graphql/q/authors-by-slugs'
import articleBySlug from '../graphql/q/article-by-slug'
import { handleUpdate, loadcounter, cache, setCache } from './_data'
import articleComments from '../graphql/q/article-comments'


// RouteData Preload
export interface ZineState {
  args?: { [key:string]: string }
  readonly stage: number
  [queryname: string]: any
}
const START = 1

// RouteDataFunc
export const ZineStateHandler = (props: RouteDataFuncArgs | any): any => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const [{ info }, { }] = useAuth()
  const client: Client = !!props.client ? props.client : useClient()
  const [promiseQuery,] = usePromiseQuery(client)
  const size = props.params?.size || 10
  const page = props.params?.page || START
  const lang = props.params?.lang || locale()
  const slug: string = location.pathname.split('/').filter(Boolean)[-1] || ''
  const subpath: string = location.pathname.split('/').filter(Boolean)[-2] || ''

  // STAGE 1 preload non conditional

  const stage1 = () => {
    if ('topicsBySlugs' in cache()) return
    else {
      setCache({ 'topicsBySlugs': {} })
      console.log(`[zine] topicsBySlugs`)
      promiseQuery(topicsAll).then(handleUpdate).then(stage2)
      // TODO: promiseQuery(communityAll).then(handleUpdate)
    }
  }

  // STAGE 2 after topics loaded

  const stage2 = () => {
    if (slug === '' && subpath === '') {
      // homepage: recent published and tops
      console.log('[zine] recentPublished')
      promiseQuery(articlesRecentPublished, { page, size: 50 }).then(handleUpdate).then(stage3)
      promiseQuery(articlesTopMonth, { page: START, size: 10 }).then(handleUpdate)
      promiseQuery(articlesTopRated, { page: START, size: 10 }).then(handleUpdate)

    } else if (slug === 'feed' || subpath === 'feed') {
      // feed: all recent and subscribed
      console.log('[zine] recentAll')
      // TODO: tune loading sequence for authorized subscribist
      promiseQuery(articlesRecentAll, { page, size: 50 }).then(handleUpdate).then(stage3)
      if (info?.userSubscribedAuthors) promiseQuery(articlesForAuthors, { page, size, slugs: info?.userSubscribedAuthors }).then(handleUpdate)
      if (info?.userSubscribedTopics) promiseQuery(articlesForTopics, { page, size, slugs: info?.userSubscribedTopics }).then(handleUpdate)
      if (info?.userSubscribedCommunities) promiseQuery(articlesForCommunities, { page, size, communities: info?.userSubscribedCommunities }).then(handleUpdate)

    } else if (slug.startsWith('@')) {
      // author's page
      const slg = slug.substring(1)
      console.log(`[zine] @${slg} is author`)
      console.log('[zine] shoutsByAuthors')
      // TODO: in future check first if it is not a community slug
      if (subpath === 'author' || subpath === 'a') {
        promiseQuery(articlesForAuthors, { page, size, slugs: [slg,] }).then(handleUpdate).then(stage3)

      } else if (slug.startsWith(':')) {
        // topics's page
        const slg = slug.substring(1)
        console.log(`[zine] :${slg} is topic`)
        console.log('[zine] shoutsByTopics')
        if (subpath === 'topic' || subpath === 't') {
          promiseQuery(articlesForTopics, { page, size, slugs: [slg,] }).then(handleUpdate).then(stage3)

        }
      } else {
        console.log('[zine] getShoutBySlug ' + slug)
        if (cache().getShoutBySlug?.slug === slug) return
        setCache(c => ({ ...c, 'getShoutBySlug': { slug } }))
        promiseQuery(articleBySlug, { slug }).then(handleUpdate)
        promiseQuery(articleComments, { slug }).then(stage3)
      }
    }
  }

  // STAGE 3 after articles loaded

  const stage3 = () => {
    console.log(`[zine] getUsersBySlugs`)
    setCache(c => ({ ...c, 'getUsersBySlugs': {} }))
    let slugs: string[] = []
    Object.values(cache()?.articles as { [slug: string]: Partial<Shout> })
      .forEach((a: Partial<Shout>) => a.authors?.forEach(
        (a: Partial<User>) => {
          if (!((a?.slug as string) in slugs)) slugs.push(a?.slug || '')
        }))
    promiseQuery(authorsBySlugs, { slugs }).then(handleUpdate)
  }

  onMount(stage1) // start loading sequence

  const zineState = {
    get params() {
      return { ...props.params, slug, size, page, subpath, lang }
    },
    get topics() {
      return cache()['topics'] || {}
    },
    get topicslist() {
      return Object.values(cache().topics || {}).sort(byViews) || []
    },
    get authors() {
      return cache()['authors'] || {}
    },
    get communities() {
      return cache()['communities'] || {}
    },
    get articles() {
      return cache()['articles'] || {}
    },
    get stage() {
      return loadcounter() || 0
    }
  } as ZineState
  return zineState
}

// Store Provider

const ZineContext = createContext<[ZineState, any]>([{} as ZineState, {}])
const ZineProvider = ZineContext.Provider

export const ZineStateProvider = (props: any): any => {
  const client: Client = !!props.client ? props.client : useClient()
  const [, promiseMutation] = usePromiseQuery(client)
  const zineState = ZineStateHandler(props)
  const zineActions = {
    addPost: (shout: Partial<Shout>) => promiseMutation(articleCreate, { ...shout }).then(handleUpdate),
    updatePost: (shout: Partial<Shout>) => promiseMutation(articleUpdate, { ...shout }).then(handleUpdate),
    deletePost: (slug: string) => promiseMutation(articleDestroy, { slug }).then(handleUpdate),
    addComment: (comment: Partial<Comment>) => promiseMutation(commentCreate, { ...comment }).then(handleUpdate),
    updateComment: (comment: Partial<Comment>) => promiseMutation(commentUpdate, { ...comment }).then(handleUpdate),
    deleteComment: (cid: string) => promiseMutation(commentDestroy, { commentId: cid }).then(handleUpdate),
    follow: (slug: string) => promiseMutation(followQuery, { slug }).then(handleUpdate),
    unfollow: (slug: string) => promiseMutation(unfollowQuery, { slug }).then(handleUpdate)
  }
  return <ZineProvider value={createStore(zineState, zineActions as any)} children={props?.children} />
}

export function useZine() {
  return useContext(ZineContext)
}
