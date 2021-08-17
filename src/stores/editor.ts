import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Proposal } from '../graphql/codegen'

export const gitpath: Writable<string> = writable(
  '/content/discours.io/index.md'
)

export const proposals: Writable<Proposal[]> = writable([])
