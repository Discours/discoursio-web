import { InMemoryCache, ApolloClient } from '@apollo/client/core'

export const client = new ApolloClient({
  uri: `https://test-api.discours.io/graphql`,
  cache: new InMemoryCache(),
})
