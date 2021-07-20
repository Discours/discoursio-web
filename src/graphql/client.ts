import { InMemoryCache } from '@apollo/client/core'
import { SvelteApolloClient } from 'svelte-apollo-client'

export const client = SvelteApolloClient({
  uri: 'localhost:8456/graphql',
  cache: new InMemoryCache(),
})
