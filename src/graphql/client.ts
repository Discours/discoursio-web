import {
  ClientOptions,
  dedupExchange,
  fetchExchange,
  // RequestPolicy,
  // ssrExchange
} from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { cache } from './cache'
// import authExchanges from './auth'
// const isClient = typeof window !== 'undefined'
// The `ssrExchange` must be initialized with `isClient` and `initialState`
// const ssrCache = ssrExchange({
//   isClient,
//   initialState: isClient ? (window as any).__URQL_DATA__ : undefined
// })

export const baseUrl = 'https://newapi.discours.io'
export const createOptions = (token?: string): ClientOptions => {
  console.info('[graphql] client is running', (token? ' authenticated':''))
  return {
    url: `${baseUrl}`,
    requestPolicy: 'cache-and-network',
    fetchOptions: () => {
      let headers: any = {} // credentials: 'include'
      try {
        if (!!token) {
          headers = { Auth: token }
          console.log('[graphql] fetch options with auth ', token)
        }
      } catch (e) {
        console.log(e)
      }
      return { headers }
    },
    exchanges: [devtoolsExchange, dedupExchange, cache, /* ssrCache, */ fetchExchange]
  }
}