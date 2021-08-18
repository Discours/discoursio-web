import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { GraphQLClient } from 'graphql-request'

export enum Locale {
  RU = 'ru',
  EN = 'en',
}

export const graphql: Writable<GraphQLClient> = writable(new GraphQLClient('test2.discours.io/graphql'))
export const loaded: Writable<boolean> = writable(false)
export const lang: Writable<Locale> = writable(Locale.RU)
export const org: Writable<string> = writable('discours.io')
