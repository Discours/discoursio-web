import { InMemoryCache } from '@apollo/client/core'
import { SvelteApolloClient } from 'svelte-apollo-client'

const client = SvelteApolloClient({
  uri: `https://localhost:8080/graphql`, // test-api.discours.io
  cache: new InMemoryCache(),
})

export default client
