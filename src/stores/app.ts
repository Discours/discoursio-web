import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { token } from './user'
import { GraphQLClient } from 'graphql-request'

export enum Locale {
	RU = 'ru',
	EN = 'en'
}

export const endpoint = writable('https://build.discours.io/graphql')
export const api = derived(
	[endpoint, token],
	([$endpoint, $token]) =>
		new GraphQLClient($endpoint, $token ? { headers: { Auth: $token } } : {})
)
export const lang: Writable<Locale> = writable(Locale.RU)
export const loading: Writable<boolean> = writable(false)
