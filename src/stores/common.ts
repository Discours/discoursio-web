import { Writable, writable } from 'svelte/store'

export enum Language {
  RU = 'ru',
  EN = 'en',
}

export const loaded: Writable<boolean> = writable(false)
export const lang: Writable<Language> = writable(Language.RU)
