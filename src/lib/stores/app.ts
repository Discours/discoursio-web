import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

import { browser } from '$app/env'

export const theme: Writable<string> = writable('default')
export const openModal: Writable<string> = writable('')
export const showNotices: Writable<boolean> = writable(false)

if (browser) {
  const value = localStorage.theme || 'default'
  theme.set(value)
  theme.subscribe((data) => (localStorage.theme = data))
}

export enum Locale {
  RU = 'ru',
  EN = 'en'
}

export const lang: Writable<Locale> = writable(Locale.RU)
export const loading: Writable<boolean> = writable(true)
export const more: Writable<string> = writable('')
export const pager: Writable<{
  [key: string]: { size: number; page: number }
}> = writable({})
