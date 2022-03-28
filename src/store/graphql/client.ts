import { ClientOptions, dedupExchange, fetchExchange, ssrExchange } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { useClient } from 'solid-urql'
import { cache } from './cache'

export const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? (window as any).__URQL_DATA__ : undefined
})

export const clientOptions: ClientOptions = {
  url: 'https://newapi.discours.io',
  requestPolicy: 'cache-and-network',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, ssrCache, fetchExchange]
}

export const authClient = (token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Auth': token // TODO: test
  }

  useClient().fetchOptions = { headers }
}