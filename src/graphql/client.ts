import {
  ClientOptions,
  dedupExchange,
  fetchExchange,
  // RequestPolicy,
  ssrExchange,
  type Client
} from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cache } from './cache'
import { createClient } from 'solid-urql'
import { createContext, useContext } from 'solid-js'
// import authExchanges from './auth'
import { useStore } from '../store'

const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? (window as any).__URQL_DATA__ : undefined
})

export const baseUrl = 'https://new.discours.io/data'
export const clientOptions: ClientOptions = {
  url: `${baseUrl}`,
  requestPolicy: 'cache-and-network',
  fetchOptions: () => {
    let headers: any = {} // credentials: 'include'
    try {
      const [{ token }] = useStore()
      if (token) headers = { ...headers, Auth: token }
    } catch (e) {
      console.log(e)
    }
    return { headers }
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, ssrCache, fetchExchange]
}

const client = createClient(clientOptions)
const ClientContext = createContext<Client>(client)

export function useClient() {
  return useContext(ClientContext)
}
