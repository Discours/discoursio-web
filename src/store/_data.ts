import { createSignal } from "solid-js"
import { OperationResult } from "solid-urql"
import { useStore } from "./index"

  
// translate from backender's language
const entities: { [key:string]: string } = {
    'topicsBySlugs': 'topics',
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
    const key = Object.keys(data).pop() as string
    const entity = entities[key]
    const value: any = Object.values(data).pop() // get list by first key of dict
    if (error) actions.warn({ body: error.message, kind: 'error' })
    if (value?.error) actions.warn({ body: value?.error, kind: 'warn' })
    else {
        setCache((s) => {
          const l = value || []
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