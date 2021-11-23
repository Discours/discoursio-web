import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = 'https://build.discours.io/graphql'

export const client = new GraphQLClient(GRAPHQL_ENDPOINT)
