import { GraphQLClient } from 'graphql-request'

export const API_ENDPOINT = 'https://build.discours.io/graphql'
export const client = new GraphQLClient(API_ENDPOINT)
