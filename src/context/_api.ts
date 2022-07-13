import { createSignal } from "solid-js"
import { OperationResult } from "solid-urql"
import { useStore } from "./index"

// internal api terms
const entities: { [key:string]: string } = {
    'topicsAll': 'topics',
    'topicsByCommunity': 'topics', // deprecated
    'authorsBySlugs': 'authors',
    'authorsByTopics': 'authors',
    'communitiesBySlugs': 'communities',
    'shoutsBySlugs': 'articles',
    'shoutsByAuthors': 'articles',
    'shoutsByTopics': 'articles',
    'shoutsByCommunities': 'articles',
    'getUsersBySlugs': 'authors',
    'topOverall': 'articles',
    'topMonth': 'articles',
    'recentPublished': 'articles',
    'recentAll': 'articles',
    'getCurrentUser': 'user',
    'signIn': 'user',
    'signUp': 'user',
    'signOut': 'user',
    'resetPassword': 'user',
    'confirmEmail': 'user',
    'inviteAuthor': 'collabInvite',
    'removeAuthor': 'collabInvite',
} 

const [, actions] = useStore()

export const [loading, setLoading] = createSignal(false)
export const [cache, setCache] = createSignal<{ [key:string]: any}>({})
export const [loadcounter, setLoadCounter] = createSignal(0)
export const handleUpdate = ({ data, error }: OperationResult) => {
    if (error && typeof actions.warn === 'function') actions.warn({ body: error.message, kind: 'error' })
    else {
      const [key, value] = Object.entries(data)[0]
      const entity = entities[key]
      if (entity === undefined) console.error(key)
      const qerror = (value as any)?.error
      if (qerror && typeof actions.warn === 'function') actions?.warn({ body: qerror, kind: 'warn' })
      else {
        setCache((s) => {
          const l = (value as any[]) || []
          let d: { [key: string]: any } = {}
          if (l && l.length > 0) {
            console.log(`[api] ${loadcounter()}: updating ${entity}`)
            l.forEach((item: any) => { if(item?.slug) d[item.slug] = item })
            console.log(`[api] ${l.length} ${entity} from ${key} have been preloaded`)
            setLoadCounter(loadcounter() + 1)
            s[entity] = { ...s[entity], ...d }
            s[key] = value
            console.debug(s)
          }
          return s
        })
        setLoading(false)
      }
    }
}