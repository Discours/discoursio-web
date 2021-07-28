import { Writable, writable } from 'svelte/store'
import type { Shout } from '../graphql/codegen'

export const shouts: Writable<{ [key: string]: Shout }> = writable({})
