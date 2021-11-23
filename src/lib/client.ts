import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = <string>import.meta.env.GRAPHQL_ENDPOINT || 'http://localhost:8080'

export const client = new GraphQLClient(GRAPHQL_ENDPOINT)
