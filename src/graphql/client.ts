import {
  ClientOptions,
  dedupExchange,
  fetchExchange,
  // RequestPolicy,
  ssrExchange
} from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cache } from './cache'
import { createClient } from 'solid-urql'
import { useStore } from '../store'

const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? (window as any).__URQL_DATA__ : undefined
})

export const baseUrl = 'https://newapi.discours.io'
export const clientOptions: ClientOptions = {
  url: `${baseUrl}/graphql`,
  requestPolicy: 'cache-and-network',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [/*devtoolsExchange,*/ dedupExchange, cache, ssrCache, fetchExchange]
}

export const client = createClient({
  ...clientOptions,
  fetchOptions: () => {
    const [{ token }] = useStore()
    let headers: { [key: string]: string } = { 'Content-Type': 'application/json' }

    // eslint-disable-next-line dot-notation
    if (token?.length) headers['Authorization'] = `Auth ${token}`

    return { headers }
  }
})
