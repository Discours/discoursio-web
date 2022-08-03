import { createSignal } from 'solid-js'
import { OperationResult } from 'solid-urql'
import { Reaction, Shout } from '../graphql/types.gen'
import { useStore } from './index'

// internal api terms
const entities: { [key: string]: string } = {
  topicsAll: 'topics',
  topicsByCommunity: 'topics', // deprecated
  authorsBySlugs: 'authors',
  authorsByTopics: 'authors',
  authorsAll: 'authors',
  communitiesBySlugs: 'communities',
  shoutsBySlugs: 'articles',
  shoutsByAuthors: 'articles',
  shoutsByTopics: 'articles',
  shoutsByCommunities: 'articles',
  getUsersBySlugs: 'authors',
  topOverall: 'articles',
  topMonth: 'articles',
  recentPublished: 'articles',
  recentAll: 'articles',
  getCurrentUser: 'user',
  signIn: 'user',
  signUp: 'user',
  signOut: 'user',
  resetPassword: 'user',
  confirmEmail: 'user',
  inviteAuthor: 'collabInvite',
  removeAuthor: 'collabInvite',
  reactionsAll: 'reactions',
  reactionsByShout: 'reactions',
  reactionsByAuthor: 'reactions',
  getShoutBySlug: 'articles',
  
}

const [, actions] = useStore()
export const [loaded, setLoaded] = createSignal<string[]>([])
export const [loading, setLoading] = createSignal(false)
export const [cache, setCache] = createSignal<{ [key: string]: any }>({})
export const [loadcounter, setLoadCounter] = createSignal(0)
export const handleUpdate = (r: OperationResult) => {
  const { data, error } = r
  if (error) {
    if(typeof actions.warn === 'function') actions.warn({ body: error.message, kind: 'error' })
    console.error(error)
    return
  } else {
    const [query, value] = Object.entries(data)[0]
    const entity = entities[query]
    if (entity === undefined) console.error(query)
    const qerror = (value as any)?.error
    if (qerror && typeof actions.warn === 'function') {
      actions?.warn({ body: qerror, kind: 'warn' })
      console.log('[api] query error: ', qerror)
    } else {
      setCache((s) => {
        let up: { [key: string]: any } = {}
        let d: { [k: string]: any } = {}
        let l = value
        if (Array.isArray(l)) l.map( a => d[a.slug] = a )
        else {
          l = Array.isArray(s[query]) ? [...s[query], value] : [value as Shout, ]
          if ((value as Shout).slug) {
            d[(value as Shout).slug] = value as Shout
            d = { ...s[entity], ...d }
          } else if ((value as Reaction).id) {
            d[(value as Reaction).id] = value as Reaction
            d = { ...s[entity], ...d }
          } else if (typeof value === 'object' && value) {
            console.error(`[api] ${entity} response: `, value)
            s[query] = value
            return s
          } else {
            console.error('[api] unknown entity format', value)
            return s
          }
        }
        up = { [entity]: d, [query]: l }
        setLoadCounter(loadcounter() + 1)
        setLoaded([...loaded(), query] as any)
        const n = Array.isArray(l) ? l.length : 1
        console.log(`[api] call №${loadcounter()}: ${query}, got ${n} ${entity}`)
        console.debug('[api] cached: ', loaded())
        return { ...s, ...up }
      })
      console.log(cache())
    }
    setLoading(false)
  }
}
