import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { token } from './auth'
import { GraphQLClient } from 'graphql-request'

export enum Locale {
	RU = 'ru',
	EN = 'en',
}

export const endpoint = writable('https://0.0.0.0:8080')
export const api = derived(
	[endpoint, token],
	([$endpoint, $token]) => new GraphQLClient($endpoint, $token ? { headers: { Auth: $token }} : {})
)
export const lang: Writable<Locale> = writable(Locale.RU)
export const loaded: Writable<boolean> = writable(false)
