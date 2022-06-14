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
import { useAuth } from '../store/auth'

const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? (window as any).__URQL_DATA__ : undefined
})

export const baseUrl = 'http://localhost:8000'
export const clientOptions: ClientOptions = {
  url: `${baseUrl}`,
  requestPolicy: 'cache-and-network',
  fetchOptions: () => {
    let headers: any = {} // credentials: 'include'

    try {
      const [{ token }] = useAuth()
      if (!!token) {
        headers = { Auth: token }
        console.log('[graphql] fetch options  with auth ', token)
      }
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
