import { InMemoryCache } from '@apollo/client/core'
import { SvelteApolloClient } from 'svelte-apollo-client'

const client = SvelteApolloClient({
  uri: `https://test-api.discours.io/graphql`,
  cache: new InMemoryCache(),
})

export default client
