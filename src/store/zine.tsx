import { useLocation } from 'solid-app-router'
import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createMutation, createQuery } from 'solid-urql'
import articlesForAuthors from '../graphql/q/articles-for-authors'
import articlesForTopics from '../graphql/q/articles-for-topics'
import articlesTopRecent from '../graphql/q/articles-top-recent'
import followQuery from '../graphql/q/follow'
import unfollowQuery from '../graphql/q/unfollow'
import deleteComment from '../graphql/q/comment-destroy'
import { Shout, User } from '../graphql/types.gen'
import { useStore } from './index'

interface ZineStore {
  page?: number
  size?: number
  articles: Partial<Shout>[]
  authors: Partial<User>[]
}
const ZineContext = createContext<[ZineStore, any]>([{} as ZineStore, {}])
const ZineProvider = ZineContext.Provider

const moreQueries: { [key: string]: any } = {
  author: articlesForAuthors,
  topic: articlesForTopics,
  // 'community': articlesForCommunity,
  '': articlesTopRecent
}

export function ZineStoreProvider(props: { children: any }) {
  const [, actions] = useStore()
  const location = useLocation()
  const [zine, setZine] = createStore({
    page: 0,
    size: 50,
    articles: [] as Partial<Shout>, // byDate
    authors: [] as Partial<User>[]
  })

  // if ?page=
  if (location.query.page) setZine({ ...zine, page: parseInt(location.query.page || '0') })

  // if ?size=
  if (location.query.size) setZine({ ...zine, size: parseInt(location.query.size || '50') })

  const zineActions = {
    addPost: (data: Partial<Shout>) => {
      // TODO: implement add post
    },
    updatePost: (data: Partial<Shout>) => {
      // TODO: implement update post
    },
    deletePost: (slug: string) => {
      // TODO: implement delete post
      // const [data] = createMutation( { query: deletePost, variables: { slug } })
    },

    inviteAuthor: (author: string, draft: string) => {}, // TODO: invite co-author
    removeAuthor: (author: string, draft: string) => {}, // TODO: remove co-author

    //addSuggestion: (slug: string, suggestion: Partial<Suggestion>) => {
    // TODO: implement add suggestion
    //},
    //updateSuggestion: (slug: string, suggestion: Partial<Suggestion>) => {
    // TODO: implement update suggestion
    //},
    deleteSuggestion: (slug: string, suggestionId: string) => {
      // TODO: implement delete suggestion
      // const [data] = createMutation( { query: deleteSuggestion, variables: { commentId } })
    },

    addComment: (slug: string, comment: Partial<Comment>) => {
      // TODO: implement add comment
    },
    updateComment: (slug: string, comment: Partial<Comment>) => {
      // TODO: implement update comment
    },
    deleteComment: (slug: string, commentId: string) => {
      // TODO: implement delete comment
      // const [data] = createMutation( { query: deleteComment, variables: { commentId } })
    },

    follow: (slug: string, what: string) => {
      console.log(`[zine] follow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: followQuery, variables: { what, slug } })
      const { error } = qdata()

      if (error) actions.warn(error)
    },

    unfollow: (slug: string, what: string) => {
      console.log(`[zine] unfollow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: unfollowQuery, variables: { what, slug } })
      const { error } = qdata()

      if (error) actions.warn(error)
    },

    more: () => {
      Object.keys(moreQueries).forEach((what: string) => {
        const query = moreQueries[what]

        if (location.pathname.startsWith(`/${what}`)) {
          console.log(`[zine] more articles from ${what}`)
          const slug = location.pathname.replace(`/${what}/`, '').replace('/', '')
          let variables = { page: zine.page + 1, size: zine.size, [what]: slug }
          const [qdata] = createQuery({ query, variables })

          setZine({ ...zine, articles: qdata() })
        }
      })
    }
  }

  return <ZineProvider value={[zine as unknown as ZineStore, zineActions]} children={props.children} />
}

export function useZine() {
  return useContext(ZineContext)
}
