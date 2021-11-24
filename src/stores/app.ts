import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export enum Locale {
	RU = 'ru',
	EN = 'en'
}

export const lang: Writable<Locale> = writable(Locale.RU)
export const loading: Writable<boolean> = writable(false)
