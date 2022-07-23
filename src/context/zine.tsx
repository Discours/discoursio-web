
import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { RouteDataFuncArgs, useLocation } from 'solid-app-router'
import { useClient, Client } from 'solid-urql'
import { useI18n } from '@solid-primitives/i18n'
import { Shout, User } from '../graphql/types.gen'
import { useAuth } from './auth'
import { usePromiseQuery } from '../utils/promiseQuery'
import { byViewed } from '../utils/sortby'
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
import reactionsByShout from '../graphql/q/article-reactions'


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

  const [slug, setSlug] = createSignal(props.params?.slug || '')
  const [subpath, setSubpath] = createSignal(location.pathname.split('/').filter(Boolean)[-2] || '')
  createEffect(() => {
    let ppp = location.pathname.split('/')
    if (ppp.length > 0) {
      try { setSubpath(ppp[ppp.length-2]) } catch(_){}
      setSlug(ppp[ppp.length-1])
    }
  }, [location.pathname])
  const [stage, setStage] = createSignal(0)
  createEffect(() => console.debug(`[zine] on ${stage()} stage`, cache()),[stage()])
  // STAGE 1 preload non conditional
  const stage1 = () => {
    if (stage() === 1) setLoading(true)
    else {
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
  }

  const stage2 = () => {
    setStage(2)
    // author page
    if( slug().startsWith('@') || subpath() === 'author' || subpath() === 'a') {
      promiseQuery(authorsBySlugs, { slugs: [ slug(), ] })
        .then(handleUpdate)
        .then(() => promiseQuery(articlesForAuthors, { slugs: [slug(),], page, size }))
        .then(handleUpdate)
        .then(stage3)
    // topic page
    } else if ( slug().startsWith(':') || subpath() === 'topic' || subpath() === 't') {
      promiseQuery(articlesForTopics, { slugs: [ slug(), ], size, page })
        .then(handleUpdate)
        .then(stage3)
    // feed page
    } else if (slug() === 'feed' || subpath() === 'feed') {
      if (auth.authorized) {
        promiseQuery(articlesForFeed, { size, page })
          .then(handleUpdate)
          .then(stage3)
      } else {
        promiseQuery(articlesRecentAll, { size, page })
          .then(handleUpdate)
          .then(stage3)
      }
    // home page
    } else if (slug() === '') {
        promiseQuery(articlesTopMonth, { page: START, size: 10 })
          .then(handleUpdate)
        promiseQuery(articlesTopRated, { page: START, size: 10 })
          .then(handleUpdate)
        promiseQuery(articlesRecentPublished, { page, size: 50 })
          .then(handleUpdate)
          .then(stage3)
    // article page
    } else if (!subpath() && slug()) {
      promiseQuery(articleBySlug, { slug: slug() })
        .then(handleUpdate)
        .then(() => promiseQuery(reactionsByShout, { slug: slug() }))
        .then(handleUpdate)
        .then(stage3)
    } else if (subpath() === 'about') {
      console.log('[about]', slug())
    } else {
      console.error('[zine] stage2: no recognized slug or subpath', slug(), subpath())
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

  createEffect(() => { 
    if(stage() === 0) stage1()
  }, [cache()]) // start loading sequence

  const zineState = {
    get params() {
      return { ...props.params, slug: slug(), size, page, subpath: subpath(), lang }
    },
    get topics() {
      return cache()['topics'] || {}
    },
    get topicslist() {
      return Object.values(cache()['topics'] || {}).sort(byViewed) || []
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
