
import { createContext, createEffect, createMemo, createSignal, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { RouteDataFuncArgs, useLocation } from 'solid-app-router'
import { useClient, Client } from 'solid-urql'
import { useI18n } from '@solid-primitives/i18n'
import { Shout, User } from '../graphql/types.gen'
import { useAuth } from './auth'
import { usePromiseQuery } from '../utils/promiseQuery'
import { byViews } from '../utils/sortby'
import { handleUpdate, cache, setCache, setLoading, loaded } from './_api'
// all zine queries
import topicsByCommunity from '../graphql/q/topics-by-community'
import articlesRecentPublished from '../graphql/q/articles-recent-published'
import articlesRecentAll from '../graphql/q/articles-recent-all'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesForFeed from '../graphql/q/articles-for-feed' // subscribed communities, topics, authors
import articlesTopMonth from '../graphql/q/articles-top-month'
import articlesTopRated from '../graphql/q/articles-top-rated'
import articleCreate from '../graphql/q/article-create'
import followQuery from '../graphql/q/follow'
import unfollowQuery from '../graphql/q/unfollow'
import articleUpdate from '../graphql/q/article-update'
import articleDestroy from '../graphql/q/article-destroy'
import commentCreate from '../graphql/q/reaction-create'
import commentUpdate from '../graphql/q/reaction-update'
import commentDestroy from '../graphql/q/reaction-destroy'
import authorsBySlugs from '../graphql/q/authors-by-slugs'
import articleBySlug from '../graphql/q/article-by-slug'
import articleComments from '../graphql/q/article-reactions'


// RouteData Preload
export interface ZineState {
  args?: { [key:string]: string }
  readonly loading?: boolean
  [queryname: string]: any
}
const START = 1

// RouteDataFunc as state initiliazer
export const ZineStateHandler = (props: RouteDataFuncArgs | any): any => {
  const location = useLocation()
  const [, { locale }] = useI18n()
  const [auth, { }] = useAuth()
  const client: Client = !!props.client ? props.client : useClient()
  const [promiseQuery,] = usePromiseQuery(client)
  const size = props.params?.size || 10
  const page = props.params?.page || START
  const lang = props.params?.lang || locale()

  const [slug, setSlug] = createSignal(props.params?.slug)
  const [subpath, setSubpath] = createSignal(location.pathname.split('/').filter(Boolean)[-2] || '')
  createEffect(() => {
    let ppp = location.pathname.split('/')
    if (ppp.length > 0) {
      try { setSubpath(ppp[ppp.length-2]) } catch(_){}
      setSlug(ppp[ppp.length-1])
    }
  }, [location.pathname])

  const [stage, setStage] = createSignal(0)
  createEffect(() => console.log(`[zine] loading stage ${stage()}/3`, cache()),[stage()])
  // STAGE 1 preload non conditional
  const stage1 = () => {
    setStage(1)
    if ('topicsByCommunity' in cache()) return
    else {
      setLoading(true)
      setCache({ 'topicsByCommunity': [] })
      promiseQuery(topicsByCommunity, { community: 'discours' })
        .then(handleUpdate)
        .then(stage2)
    }
  }

  // STAGE 2 after topics loaded
  const stage2 = () => {
    setStage(2)
    setLoading(true)
    const [sl, sp] = [slug(), subpath()]
    if (window.location.pathname === '' || window.location.pathname === '/') {
      // homepage: recent published and tops
      promiseQuery(articlesTopMonth, { page: START, size: 10 }).then(handleUpdate)
      promiseQuery(articlesTopRated, { page: START, size: 10 }).then(handleUpdate)
      promiseQuery(articlesRecentPublished, { page, size: 50 })
        .then(handleUpdate)
        .then(stage3)

    } else if (sl === 'feed' || sp === 'feed') {
      // feed: all user subscribed   
      if (auth.authorized) promiseQuery(articlesForFeed, { page, size }).then(handleUpdate)
      // TODO: tune loading sequence for authorized subscribist
      promiseQuery(articlesRecentAll, { page, size: 50 })
        .then(handleUpdate)
        .then(stage3)
   
    } else if (sl.startsWith('@')) {
      // author's page
      const slg = sl.substring(1)
      console.log(`[zine] @${slg}`)
      // TODO: in future check first if it is not a community slug
      if (sp === 'author' || sp === 'a') {
        promiseQuery(articlesForAuthors, { page, size, slugs: [slg,] })
          .then(handleUpdate)
          .then(stage3)

      } else if (sl.startsWith(':')) {
        // topics's page
        const slg = sl.substring(1)
        console.log(`[zine] :${slg}`)
        if (sp === 'topic' || sp === 't') {
          promiseQuery(articlesForTopics, { page, size, slugs: [slg,] })
            .then(handleUpdate)
            .then(stage3)

        }
      } else {
        console.log('[zine] * ' + sl)
        if (cache().getShoutBySlug?.slug === sl) return
        setCache(c => ({ ...c, 'getShoutBySlug': { slug: sl } }))
        promiseQuery(articleBySlug, { slug: sl })
          .then(handleUpdate)
        promiseQuery(articleComments, { slug: sl })
          .then(handleUpdate)
          .then(stage3)
      }
    }
  }

  // STAGE 3 after articles loaded
  const articles = createMemo(() => cache()['articles'])
  const stage3 = () => setStage(3)
  
  createEffect(() => {
    if(articles()?.length > 0 && stage() === 3) {
      setLoading(true)
      setCache(c => ({ ...c, 'getUsersBySlugs': [] }))
      let slugs: string[] = []
      articles().forEach((a: Partial<Shout>) => a.authors?.forEach(
          (a: Partial<User>) => {
            if (!((a?.slug as string) in slugs)) slugs.push(a?.slug || '')
          }))
      promiseQuery(authorsBySlugs, { slugs })
        .then(handleUpdate)
        .then(() => setLoading(false))
    }
  },[articles(), stage()])

  onMount(stage1) // start loading sequence

  const zineState = {
    get params() {
      return { ...props.params, slug: slug(), size, page, subpath: subpath(), lang }
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
      return articles() || []
    },
    get loading() {
      return loaded()?.length === 0
    }
  } as ZineState
  return zineState
}

// Store Provider

const ZineContext = createContext<[ZineState, any]>([{} as ZineState, {}])
const ZineProvider = ZineContext.Provider

export const ZineStateProvider = (props: any): any => { // store { state actions } provider
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
