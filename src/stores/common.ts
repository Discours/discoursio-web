import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export enum Locale {
  RU = 'ru',
  EN = 'en',
}

export const graphql: Writable<GraphQLClient> = writable()
export const loaded: Writable<boolean> = writable(false)
export const lang: Writable<Locale> = writable(Locale.RU)
