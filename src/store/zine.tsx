import { useLocation } from 'solid-app-router'
import { createContext, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { OperationResult } from 'solid-urql'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesRecentPublished from '../graphql/q/articles-recent-published'
import articlesRecentAll from '../graphql/q/articles-recent-all'
import articlesForCommunities from '../graphql/q/articles-for-communities'
import articleCreate from '../graphql/q/article-create'
import followQuery from '../graphql/q/follow'
import unfollowQuery from '../graphql/q/unfollow'
import { Shout, User } from '../graphql/types.gen'
import { useStore } from './index'
import { usePromiseQuery } from '../utils/promiseQuery'
import articleUpdate from '../graphql/q/article-update'
import articleDestroy from '../graphql/q/article-destroy'
import commentCreate from '../graphql/q/comment-create'
import commentUpdate from '../graphql/q/comment-update'
import commentDestroy from '../graphql/q/comment-destroy'
interface ZineStore {
  readonly loading: boolean
  page: number
  size?: number
  articles: Partial<Shout>[]
  authors: Partial<User>[]
}
const ZineContext = createContext<[ZineStore, any]>([{} as ZineStore, {}])
const ZineProvider = ZineContext.Provider

const moreQueries: { [key: string]: any } = {
  author: articlesForAuthors,
  topic: articlesForTopics,
  feed: articlesRecentAll,
  community: articlesForCommunities,
  '': articlesRecentPublished
}

export const ZineStoreProvider = (props: any) => {
  const [promiseQuery, promiseMutation] = usePromiseQuery(props.client)
  const [, setLoading] = createSignal(false)
  const [, actions] = useStore()
  const location = useLocation()
  const [zine, setZine] = createStore({
    page: 1,
    size: 50,
    articles: [] as Partial<Shout>, // byDate
    authors: [] as Partial<User>[] // byName
  } as ZineStore)

  // if ?page=
  if (location.query.page) {
    setZine({ ...zine, page: parseInt(location.query.page || '1') })
  }

  // if ?size=
  if (location.query.size) {
    setZine({ ...zine, size: parseInt(location.query.size || '50') })
  }

  const zineActions = {
    addPost: (shout: Partial<Shout>) => {
      setLoading(true)
      promiseMutation(articleCreate, { ...shout })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent articles dataset here
          }
          setLoading(false)
        })
    },
    updatePost: (shout: Partial<Shout>) => {
      setLoading(true)
      promiseMutation(articleUpdate, { ...shout })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent articles dataset here
          }
          setLoading(false)
        })
    },
    deletePost: (slug: string) => {
      setLoading(true)
      promiseMutation(articleDestroy, { slug })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent articles dataset here
          }
          setLoading(false)
        })
    },

    addComment: (slug: string, comment: Partial<Comment>) => {
      setLoading(true)
      promiseMutation(commentCreate, { slug, comment })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent comments dataset here
          }
          setLoading(false)
        })
    },
    updateComment: (slug: string, comment: Partial<Comment>) => {
      setLoading(true)
      promiseMutation(commentUpdate, { slug, comment })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent comments dataset here
          }
          setLoading(false)
        })
    },
    deleteComment: (slug: string, commentId: string) => {
      setLoading(true)
      promiseMutation(commentDestroy,{ slug, commentId })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent comments dataset here
          }
          setLoading(false)
        })
    },

    follow: async (slug: string, what: string) => {
      console.log(`[zine] follow ${slug} from ${what}`)
      promiseMutation(followQuery,{ slug, what })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent comments dataset here
          }
          setLoading(false)
        })
    },

    unfollow: async (slug: string, what: string) => {
      console.log(`[zine] unfollow ${slug} from ${what}`)
      promiseMutation(unfollowQuery, { slug, what })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error) actions.warn({ body: error.message, kind: 'error' })
          if(value?.error) actions.warn({ body: value?.error, kind: 'warn' })
          else {
            console.debug(value)
            // TODO: update recent comments dataset here
          }
          setLoading(false)
        })
    },

    more: () => {
      Object.keys(moreQueries).forEach((what: string) => {
        if (location.pathname.startsWith(`/${what}`)) {
          console.log(`[zine] more articles from ${what}`)
          setLoading(true)
          const query = moreQueries[what]
          const slug = location.pathname.replace(`/${what}/`, '').replace('/', '')
          let variables = { page: zine.page + 1, size: zine.size, [what]: slug }
          promiseQuery(query, variables)
            .then(({data, error}: OperationResult) => {
              const value: any = Object.values(data)[0]
              if(error) actions.warn({ kind: 'error', body: error.message })
              if(value?.error) actions.warn({ kind: 'warn', body: value?.error})
              else Promise.resolve(value)
              setLoading(false)
            })
        }
      })
    }
  }

  return <ZineProvider value={[zine as unknown as ZineStore, zineActions]} children={props.children} />
}

export function useZine() {
  return useContext(ZineContext)
}
