import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
export enum Locale {
  RU = 'ru',
  EN = 'en',
}

export const loaded: Writable<boolean> = writable(false)
export const lang: Writable<Locale> = writable(Locale.RU)
export const org: Writable<string> = writable('discours.io')
