import { Writable, writable } from 'svelte/store'

export const token: Writable<string> = writable('')
