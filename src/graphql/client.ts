import {
  ClientOptions,
  dedupExchange,
  fetchExchange,
  // RequestPolicy,
  ssrExchange
} from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { useClient } from 'solid-urql'
import { cache } from './cache'

const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? (window as any).__URQL_DATA__ : undefined
})

export const baseUrl = 'https://newapi.discours.io'
export const clientOptions: ClientOptions = {
  url: baseUrl,
  requestPolicy: 'cache-and-network',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, ssrCache, fetchExchange]
}

export const authClient = (token: string) => {
  let headers = {
    'Content-Type': 'application/json',
    Auth: token // TODO: test
  }
  const client = useClient()

  client.fetchOptions = { headers }
}
