import { Writable, writable } from 'svelte/store'

export const gitpath: Writable<string> = writable(
  '/content/discours.io/index.md'
)
