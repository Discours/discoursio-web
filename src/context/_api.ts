import { createSignal } from 'solid-js'
import { OperationResult } from 'solid-urql'
import { useStore } from './index'

// internal api terms
const entities: { [key: string]: string } = {
  topicsAll: 'topics',
  topicsByCommunity: 'topics', // deprecated
  authorsBySlugs: 'authors',
  authorsByTopics: 'authors',
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
  removeAuthor: 'collabInvite'
}

const [, actions] = useStore()
export const [loaded, setLoaded] = createSignal<string[]>([])
export const [loading, setLoading] = createSignal(false)
export const [cache, setCache] = createSignal<{ [key: string]: any }>({})
export const [loadcounter, setLoadCounter] = createSignal(0)
export const handleUpdate = (r: OperationResult) => {
  const { data, error } = r
  if (error && typeof actions.warn === 'function') actions.warn({ body: error.message, kind: 'error' })
  else if (!!data) {
    const [query, value] = Object.entries(data)[0]
    const entity = entities[query]
    if (entity === undefined) console.error(query)
    const qerror = (value as any)?.error
    if (qerror && typeof actions.warn === 'function') actions?.warn({ body: qerror, kind: 'warn' })
    else {
      setCache((s) => {
        const l = (value as any[]) || []
        let up: { [key: string]: any } = {}
        if (l?.length > 0) {
          let d: { [k: string]: any } = {}
          l.forEach((item: any) => {
            if (item?.slug) d[item.slug] = item
          })
          up = {
            [entity]: { ...s[entity], ...d }, // dict updating
            [query]: l // list overwriting
          }
          setLoadCounter(loadcounter() + 1)
          setLoaded([...loaded(), query] as any)
          console.log(`[api] call №${loadcounter()}: ${query}, got ${l.length} ${entity}`)
          console.debug('[api] cached: ', loaded())
        }
        return { ...s, ...up }
      })
    }
    setLoading(false)
  } else console.error(r)
}
