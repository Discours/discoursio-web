import { GraphQLClient } from 'graphql-request'

export const API_ENDPOINT = 'https://newapi.discours.io'
export const client = new GraphQLClient(API_ENDPOINT)
