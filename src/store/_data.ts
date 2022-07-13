import { createSignal } from "solid-js"
import { OperationResult } from "solid-urql"
import { useStore } from "./index"

  
// translate from backender's language
const entities: { [key:string]: string } = {
    'topicsAll': 'topics',
    'topicsBySlugs': 'topics', // deprecated
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
}

const [, actions] = useStore()

export const [cache, setCache] = createSignal<{ [key:string]: any}>({})
export const [loadcounter, setLoadCounter] = createSignal(0)
export const handleUpdate = ({ data, error }: OperationResult) => {
    if (typeof actions.warn !== 'function') return
    if (error) actions.warn({ body: error.message, kind: 'error' })
    else {
      const [key, value] = Object.entries(data)[0]
      const entity = entities[key]
      const qerror = (value as any)?.error
      if (qerror) actions.warn({ body: qerror, kind: 'warn' })
      else {
        setCache((s) => {
          const l = (value as any[]) || []
          let d: { [key: string]: any } = {}
          if (l && l.length > 0) {
            console.log(`[_cache] ${loadcounter()}: updating ${entity}`)
            l.forEach((item: any) => { if(item?.slug) d[item.slug] = item })
            console.log(`[_cache] ${l.length} ${entity} from ${key} have been preloaded`)
            setLoadCounter(loadcounter() + 1)
            s[entity] = { ...s[entity], ...d }
            s[key] = value
            console.debug(s)
          }
          return s
        })
      }
    }
}