import { createClient, dedupExchange, fetchExchange, ssrExchange } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cache } from './cache'

export const API_ENDPOINT = 'https://newapi.discours.io'

const isServerSide = typeof window === 'undefined'

// The `ssrExchange` must be initialized with `isClient` and `initialState`
export const ssrCache = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? (window as any).__URQL_DATA__ : undefined
})

export const client = createClient({
  url: API_ENDPOINT,
  requestPolicy: 'cache-and-network',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, ssrCache, fetchExchange]
})
