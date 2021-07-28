import { InMemoryCache } from '@apollo/client/core'
import { SvelteApolloClient } from 'svelte-apollo-client'

export const client = SvelteApolloClient({
  uri: `test-api.discours.io:8456/graphql`,
  cache: new InMemoryCache(),
})
