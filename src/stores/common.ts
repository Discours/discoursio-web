import { Writable, writable } from 'svelte/store'

export const loaded: Writable<boolean> = writable(false)
